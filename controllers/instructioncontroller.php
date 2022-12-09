<?php

namespace API\CONTROLLERS;



use API\MODELS\Files;
use API\MODELS\User;
use API\MODELS\Instruction;
use API\SYSTEM\Controller;
use API\SYSTEM\Uploader;


class instructioncontroller extends Controller
{
    
    public function new()
    {

       if(
          isset($_POST['user_id'])&&
          isset($_POST['priority'])&&
          isset($_POST['subject'])&&
          isset($_POST['description'])&&
          isset($_POST['target'])
       ){

            $files        = $_FILES['files'] ?? [];
            $boss         = $_POST['user_id'];
            $priority     = $_POST['priority'];
            $subject      = $_POST['subject'];
            $description  = $_POST['description'];
            $author       = $_POST['target'];

            $i = new Instruction();
            $i->boss         = $boss;
            $i->priority     = $priority ;
            $i->subject      = $subject ;
            $i->description  = $description ;
            $i->target       = $author ;
            $result = $i->create();
            $files = (new Uploader('.'))->upload();

            foreach($files as $file){
                
                $f = new Files;
                $f->task_id = $result->id;
                $f->name = $file['name'];
                $f->hash = $file['hash'];
                $f->path = $file['path'];
                $f->signature_directure = '1';
                $f->signature_head = '1';
                $res = $f->create();
            }
            echo json_encode(["result"=>"success"]);
            return true;
       }
       echo json_encode(["result"=>"error"]);
        return false;
    }

    public function signDocumentRelatedToOrder()
    {
     
        if(isset($_POST['task_id'])){
            $ins = Instruction::find($_POST['task_id']);
            $files = Files::where("", "=", $ins->id);
            return \json_encode(['result' => "sucess"]);
        }
    }

    public function adminFetchAll(){
        if(isset($_POST['id'])){
            $id = $_POST['id'];
            $users = User::exec(" select *,id as `key` from user where  boss = ".$id);
            $instructions = Instruction::exec("select *,id as `key` from instruction where boss = ".$id." and isSigned = 0");
            $archieve     = Instruction::exec("select *,id as `key` from instruction where boss = ".$id." and isSigned = 1");
            echo json_encode([
                'result' => [
                    "users" => $users?$users:[],
                    "instruction" => $instructions?$instructions:[],
                    "archieve" => $archieve?$archieve:[]
                ]
            ]);
            return true;
        }
        echo \json_encode(["result"=>"error"]);
        return false;
    }


    public function headFetchAll(){
        if(isset($_POST['id'])){
            $id = $_POST['id'];
            $instructions = Instruction::exec("select *,id as `key` from instruction where boss = ".$id." and isSigned = 0");
            $archieve     = Instruction::exec("select *,id as `key` from instruction where boss = ".$id." and isSigned = 1");
            echo json_encode([
                'result' => [
                    "instruction" => $instructions?$instructions:[],
                    "archieve" => $archieve?$archieve:[]
                ]
            ]);
            return true;
        }
        echo \json_encode(["result"=>"error"]);
        return false;
    }

    public function specialistFetchAll(){
        if(isset($_POST['id'])){
            $id = $_POST['id'];
            $instructions = Instruction::exec("select *,id as `key` from instruction where boss = ".$id." and isSigned = 0");
            $archieve     = Instruction::exec("select *,id as `key` from instruction where boss = ".$id." and isSigned = 1");
            echo json_encode([
                'result' => [
                    "instruction" => $instructions?$instructions:[],
                    "archieve" => $archieve?$archieve:[]
                ]
            ]);
            return true;
        }
        echo \json_encode(["result"=>"error"]);
        return false;
    }


    private function sign($cleartext,$private_key,$sig="")
    {
        $msg_hash = md5($cleartext);
        openssl_private_encrypt($msg_hash, $sig, $private_key);
        echo $sig;
        $signed_data = $cleartext . "----SIGNATURE:----" . $sig;
        return $signed_data;
    }

    private function verify($my_signed_data,$public_key)
    {
        list($plain_data,$old_sig) = explode("----SIGNATURE:----", $my_signed_data);
        openssl_public_decrypt($old_sig, $decrypted_sig, $public_key);
        $data_hash = md5($plain_data);
        if($decrypted_sig == $data_hash && strlen($data_hash)>0)
            return $plain_data;
        else
            return "ERROR";
    }

    public function signDoc(){
        if(isset($_POST['id'])){
            $task = Instruction::find($_POST['id']);
            $user = User::find($task->boss);
            if($task->isSigned=="0"){
                $files = Files::where("task_id", "=", $_POST['id']);
                foreach($files as $file){
                    $fileAbspath = $file->path . '/' . $file->hash;
                    $data = \file_get_contents($fileAbspath);
                    $encrypted_data = $this->sign($data,$user->private_key,$user->public_key);
                    \file_put_contents($fileAbspath,$encrypted_data);
                }
                $task->isSigned = "1";
                var_dump($task);
                $res = $task->update();
                var_dump($res);
            }
            echo \json_encode(["result" => "sucess"]);
            return true;
        }
        echo \json_encode(['result' => "error"]);
    }

    public function signFile(){
        
    }
    public function fetchByID(){
        if(isset($_POST['id'])){
            $id = $_POST['id'];
            $i = Instruction::find($id);
            $files = Files::where("task_id","=",$i->id);
            $i->files = $files;
            echo json_encode(["result" => $i]);
            return true;
        }
        echo json_encode(["result" => "error"]);
        return false;
    }

    
}
