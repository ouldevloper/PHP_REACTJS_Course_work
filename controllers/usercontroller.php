<?php
namespace API\CONTROLLERS;
use API\MODELS\User;
use API\SYSTEM\Controller;
use API\SYSTEM\Helper;

class usercontroller extends Controller{ 
    public function makeuser(){
        if( isset($_POST['fullname']) &&
            isset($_POST['role']) &&
            isset($_POST['boss']) &&
            isset($_POST['email']) &&
            isset($_POST['password']) 
        ){
            $u = new User;
            $u->fullname = $_POST['fullname'];
            $u->role     = $_POST['role'];
            $u->boss     = $_POST['boss'];
            $u->email    = $_POST['email'];
            $u->last_access = Helper::now();
            $u->joined_at = Helper::now();
            $u->password = Helper::password($_POST['password']);
            $u->private_key = hash("sha512",$_POST['email']);
            $u->public_key  = hash("sha512",$_POST['fullname']);
            $res = $u->create();
            echo json_encode(["result" => "success"]);
            return;
        }
        echo json_encode(["result"=>"error"]);
    }

    public function fetchBossS(){
        $sql = "select id,fullname from user where role in  ( 'boss','head')";
        $aUsers = User::exec($sql);
        echo json_encode(['result' => $aUsers]);
        return;
    }


    public function fetchTargetS(){
        if(isset($_POST['role'])){
            $sql = "";
            switch($_POST['role']){
                case "boss":
                    $sql = "select id,fullname from user where role != 'boss'";
                    break;
                case "head":
                    $sql = "select id,fullname from user where role = 'specialist'";
                    break;
                default:
                    $sql  =  "select id,fullname from user where role in ('boss', 'specialist') ";
                    break;
            }
            $aUsers = User::exec($sql);
            echo json_encode(['result' => $aUsers]);
            return;
        }
        echo json_encode(['result' => []]);
        return;
       
    }

    public function login(){
        if(isset($_POST['email']) && isset($_POST['password'])){
            $user = User::where("email", "=", $_POST['email'], " and ", "password", "=", Helper::password($_POST['password']));
            if(!empty($user)){
                $user = $user[0];
                $token = md5($user->email + $user->password);
                echo json_encode(["result" => ["email" => $user->email, "id" => $user->id,"role"=>$user->role,"fio"=>$user->fullname,"token"=>$token]]);
                return;
            }
        }
        echo json_encode(['result' => "error"]);
    }

    public function delete(){

    } 

    public function fetch(){

    }

    public function fetchByID(){

    }
    
}