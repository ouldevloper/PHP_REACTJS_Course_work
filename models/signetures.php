<?php
namespace API\MODELS;
use API\SYSTEM\Model;

class Signetures extends Model{
    public $id;
    public $name;
    public $user_id;
    public $path;
    public $created_at;
    public static $tableName = "signetures";
    public static $primaryKey = "id";
    public static $tableSchema = [
        "id"            => "DATA_TYPE_INT",
        "name"          => "DATA_TYPE_STR",
        "user_id"       => "DATA_TYPE_INT",
        "path"          => "DATA_TYPE_STR",
        "created_at"    => "DATA_TYPE_STR"
    ];

}

