<?php

use API\SYSTEM\Router;
use API\MODELS\Task;
use API\SYSTEM\Helper;

Router::POST("/api/makeuser"            ,"user@makeuser"); 
Router::POST("/api/getboss"             ,"user@fetchBossS"); 
Router::POST("/api/gettarget"           ,"user@fetchTargetS"); 
Router::POST("/api/login"               ,"user@login"); 
Router::POST("/api/new/instruction"     ,"user@new"); 
Router::POST("/api/admin"               ,"instruction@adminFetchAll");
Router::POST("/api/head"               ,"instruction@headFetchAll");
Router::POST("/api/user"               ,"instruction@specialistFetchAll");
Router::POST("/api/get"                 ,"instruction@fetchByID");
Router::POST("/api/new/instruction"     ,"instruction@new");
Router::POST("/api/signdoc"             ,"instruction@signDoc");



Router::GET("/api/login", function () {
    echo "hello world";
});