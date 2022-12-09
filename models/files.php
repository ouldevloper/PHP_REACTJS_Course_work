<?php
namespace API\MODELS;
use API\SYSTEM\Model;


class Files extends Model {
    public $id;
    public $name;
    public $path;
    public $task_id;
    public $signature_directure;
    public $signature_head;
    public $hash;
    public static $tableName = "files";
    public static $primaryKey = "id";
    public static $tableSchema = [
        "id"                    =>  "DATA_TYPE_INT",
        "name"                  => "DATA_TYPE_STR",
        "path"                  =>  "DATA_TYPE_INT",
        "task_id"   =>  "DATA_TYPE_INT",
        "signature_directure"   =>  "DATA_TYPE_INT",
        "signature_head"        =>  "DATA_TYPE_INT",
        "hash"                  =>  "DATA_TYPE_INT",
    ];



}