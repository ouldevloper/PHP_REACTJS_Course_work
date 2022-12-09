<?php

namespace API\SYSTEM;

use \PDO;
use PDOException;

class Model

{

	protected static $cnx;

	private static function connection(){

		if(static::$cnx == null){

			try

			{

				static::$cnx = new \PDO('mysql://hostname = '.DB_HOST.';dbname='.DB_NAME.';',DB_USER,DB_PASS);

			}catch(\PDOException $er){
				die(json_encode(array("Error"=> 'coulde not connect to database')));}

		}

		return static::$cnx;

	}

	private function getColumns(){

		$cols='';

		foreach (static::$tableSchema as $column => $type) {			

			if($this->$column!=null)

			{

				if($column === static::$primaryKey){

					if($this->id === null){

						$cols .= $column ." = ? ,";

					}

				}else{

					$cols .= $column ." = ? ,";

				}				

			}

		}		

		return trim($cols,',');

	}

	private function getValues(){

		$val = [];

		foreach (static::$tableSchema as $column => $type) {

			if($this->$column!=null)

			{

				if($column === static::$primaryKey){

					if($this->id === null){

						$val []= $this->filterTags($this->$column);

					}

				}else{

					$val []= $this->filterTags($this->$column) ;

				}

			}

		}

		return $val; //explode(',',trim($val,','));

	}

	private function filterTags($str){

		return $str;//htmlentities(strip_tags(trim($str)));

	}

	public function create(){

		try{

		$sql = 'INSERT INTO '. static::$tableName . ' SET '. self::getColumns();
		$stmt = self::connection()->prepare($sql);
		$stmt->execute($this->getValues());
		$res = self::find(self::last_inserted_id());
		return $res;
		}catch(\PDOException $err){
			return false;
		}



	}

	public function update()
	{
		try{
			$sql = 'UPDATE '. static::$tableName . ' SET '. $this->getColumns() . ' WHERE '.static::$primaryKey . ' = ' . $this->{static::$primaryKey};
			$stmt = self::connection()->prepare($sql);
			$res = $stmt->execute($this->getValues());
			var_dump($res);
			return $res;
		}catch(PDOException $er){
			return false;
		}

	}

	public function delete()

	{

		$sql = 'DELETE FROM '. static::$tableName . ' WHERE '.static::$primaryKey . ' = ' . $this->{static::$primaryKey};

		$stmt = self::connection()->query($sql);

		return $stmt;

	}

	public function save($op){

		switch ($op) {

			case 'add':

				$this->create();

				break;

			case 'delete':

				$this->delete();

				break;

			case 'update':

				$this->update();

				break;

			default:

				return;

		}

	}

	public static function all()

	{

		$sql = 'SELECT * FROM '.static::$tableName;

		$stmt = self::connection()->prepare($sql);

		if($stmt->execute() === true){

			$res = $stmt->fetchAll(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE,get_called_class(),null); 

			return is_array($res)?$res:false;

		}

	}

	public static function find($pk){

		$sql = 'SELECT * FROM '.static::$tableName . ' WHERE '. static::$primaryKey . ' = ?';

		$stmt = self::connection()->prepare($sql);

		if($stmt->execute(array($pk)) === true )

		{

			$obj = $stmt->fetchAll(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE,get_called_class());

			return !empty($obj)?array_shift($obj):false;

		} 

		return false;

	}

	public static function first(){

		$sql = 'SELECT * FROM '.static::$tableName . ' limit 1';

		$stmt = $this->connection()->prepare($sql);

		if($stmt->execute(array()) === true )

		{

			$obj = $stmt->fetchAll(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE,get_called_class(),null);

			return !empty($obj)?array_shift($obj):false;

		} 

		return false;

	}

	public static function last(){

		$sql = 'SELECT * FROM '.static::$tableName . ' limit '.((int)self::count()-1)	.' , 1';

		$stmt = self::connection()->prepare($sql);

		if($stmt->execute() === true )

		{

			$obj = $stmt->fetchAll(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE,get_called_class(),null);
			return !empty($obj)?array_shift($obj):false;

		} 

		return false;

	}
	public static function orderBy($orderby,$where="1=1"){
		$sql  = 'SELECT * FROM '.static::$tableName;
		$sql.= " where ".$where;
		$sql.= " ".$orderby;

		$stmt = self::connection()->prepare($sql);	
		if($stmt->execute() === true){
			$res = $stmt->fetchAll(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE,get_called_class(),null); 
			return is_array($res)?$res:false;
		}	
		return false;
	}
	public static function where(...$input)

	{

		$vals = array();

		$size = count($input);

		$sql = 'SELECT * FROM '.static::$tableName;

		if($size == 2)

		{

			$sql .= ' WHERE '.$input[0]. ' = ? ';

			array_push($vals, $input[1]);

		}elseif ($size == 3) {

			$sql .= ' WHERE '.$input[0]. ' '.$input[1] .' ? ';

			array_push($vals, $input[2]);

		}elseif ($size >= 7 && ($size - 3) % 4 == 0) {

			for($i=0;$i<$size;$i++)

			{

				if ($i===0) {

					$sql .= ' WHERE '.$input[$i]. ' '.$input[$i+1] .' ? ';					

					array_push($vals, $input[$i+2]);

					$i=$i+2;	

				}else{

					$sql .= $input[$i].'  '.$input[$i+1]. ' '.$input[$i+2] .' ? ';

					

					array_push($vals, $input[$i+3]);

					$i=$i+3;

				}

			}			

		}else{

			$sql .= ' WHERE 1 <> 1';

		}

		$stmt = self::connection()->prepare($sql);
		if($stmt->execute($vals) === true){
			$res = $stmt->fetchAll(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE,get_called_class(),null); 
			return is_array($res)?$res:false;
		}	

	}

	public static function exec($sql,$default_ret=[]){

		$stmt = self::connection()->prepare($sql);

		if($stmt->execute() === true )

		{

			$obj = $stmt->fetchAll(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE,get_called_class(),null);

			return !empty($obj)?$obj:$default_ret;

		} 

		return false;

	}



	public static function execute($sql){

		$stmt = self::connection()->prepare($sql);

		if($stmt->execute() === true )

		{

			$obj = $stmt->fetch();

			return isset($obj)?$obj:false;

		} 

		return false;

	}

	public static function last_inserted_id(){
		$stmt = self::connection()->prepare("SELECT LAST_INSERT_ID()");
		$stmt->execute();
		return $stmt->fetchColumn();
	}
	public static function num($sql){
		$stmt = self::connection()->prepare($sql);
		$stmt->execute();
		return $stmt->fetchColumn();
	}

	public static function count(){

		$sql  = 'SELECT * FROM '.static::$tableName;

		$stmt = self::connection()->prepare($sql);

		$stmt->execute();

		return $stmt->fetchColumn();

	}



	/**

	*	create

	*	update

	*	delete

	*	find

	*	all

	*	where

	*	count

	*	first

	*	last

	***/

}

