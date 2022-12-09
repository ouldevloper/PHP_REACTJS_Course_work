<?php
namespace API\MODELS;
use API\SYSTEM\Model;

class Auth extends Model{
    public $id;
    public $user_id;
    public $token;
    public static $tableName = "auth";
    public static $primaryKey = "id";
    public static $tableSchema = [
        "id"          => "DATA_TYPE_INT",
        "user_id"     => "DATA_TYPE_INT",
        "token"       => "DATA_TYPE_STR",
    ];
}