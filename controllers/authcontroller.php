<?php

namespace API\CONTROLLERS;
use API\MODELS\Auth;
use API\SYSTEM\Controller;
use API\SYSTEM\Helper;


class authcontroller extends Controller{
    
    public static function login(){
        return false;
    }
    public static function isAuth(){
        $auth = getallheaders();
        if(!empty($auth)) $auth = $auth["Authorization"];
        return $auth;
    }

}
