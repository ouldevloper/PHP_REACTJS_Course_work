<?php





!defined("DS")?define("DS",DIRECTORY_SEPARATOR):null;

!defined("__SYS__")?define("__SYS__",realpath(__DIR__).DS.'..'.DS.'system'):null;

!defined("__CTL__")?define("__CTL__",realpath(__DIR__).DS.'..'.DS.'controllers'):null;

!defined("__MDL__")?define("__MDL__",realpath(__DIR__).DS.'..'.DS.'models'):null;

!defined("__IMG__")?define("__IMG__",realpath(__DIR__).DS.'..'.DS.'images'):null;




!defined("DB_HOST")?define("DB_HOST","127.0.0.1"):null;

!defined("DB_PORT")?define("DB_PORT",3306)       :null;

!defined("DB_NAME")?define("DB_NAME","course")       :null;

!defined("DB_USER")?define("DB_USER","root")     :null;

!defined("DB_PASS")?define("DB_PASS","user")     :null;





function pre($arr){

    echo "<pre>";

    var_dump($arr);

    echo "<pre>";

}







