<?php
namespace API\MODELS;
use API\SYSTEM\Model;


class User extends Model {
 


    public $id;
    public $fullname;
    public $role;
    public $password;
    public $email;
    public $last_access;
    public $boss;
    public $private_key;
    public $public_key;
    public $joined_at;
    public static $tableName = "user";
    public static $primaryKey = "id";
    public static $tableSchema = [
        "id"             => "DATA_TYPE_INT",
        "fullname"       => "DATA_TYPE_STR",
        "role"           => "DATA_TYPE_INT",
        "password"       => "DATA_TYPE_STR",
        "email"          => "DATA_TYPE_STR",
        "last_access"    => "DATA_TYPE_STR",
        "boss"               => "DATA_TYPE_STR",
        "private_key"    => "DATA_TYPE_STR",
        "public_key"     => "DATA_TYPE_STR",
        "joined_at"      => "DATA_TYPE_STR",
    ];


}