<?php

namespace API\MODELS;

use API\SYSTEM\Model;

class Instruction extends Model{
    public $id;
    public $subject;
    public $description;
    public $priority;
    public $hasText;
    public $dateFinish;
    public $created_at;
    public $isSigned;
    public $boss;
    public $target;

    public static $tableName = "instruction";
    public static $primaryKey = "id";
    public static $tableSchema = [
        "id"            => "DATA_TYPE_STR",
        "subject"       => "DATA_TYPE_STR",
        "description"   => "DATA_TYPE_STR",
        "priority"      => "DATA_TYPE_STR",
        "hasText"       => "DATA_TYPE_STR",
        "dateFinish"    => "DATA_TYPE_STR",
        "created_at"    => "DATA_TYPE_STR",
        "isSigned"          => "DATA_TYPE_STR",
        "boss"          => "DATA_TYPE_STR",
        "target"        => "DATA_TYPE_STR",
    ];


}