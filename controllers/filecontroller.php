<?php

namespace API\CONTROLLERS;
use API\SYSTEM\Controller;

class filecontroller extends Controller{
    private $file = null;
    public function get(){
        $task_id = filter_var($_POST['task_id'],FILTER_SANITIZE_NUMBER_INT);
        if(isset($task_id)){
            $this->file = Files::where("task_id","=",$task_id);
            if(isset($this->file)){
                echo json_encode($this->file);
                return true;
            }
        }
        return Helper::Error("Error! Something wrrong!");
    }

    
    public  function getTaskFiles($id){
        $task_id = filter_var($id,FILTER_SANITIZE_NUMBER_INT);
        if(isset($task_id)){
            $this->file = Files::where("task_id","=",$task_id);
            if(isset($this->file)){
                foreach($this->file as $file){
                    unset($file->path);
                    unset($file->task_id);
                    unset($file->hash);
                }
                return $this->file;
            }
        }
        return [];
    }

    public function addNewOne($key,$task_id){
        if(isset($_FILES["files"])){
       $count  = count($_FILES[$key]['name']);
       foreach(range(0,$count-1)  as $index){
            $name = $_FILES["files"]['name'][$index];
            $extention = $extension = pathinfo($_FILES[$key]['name'][$index], PATHINFO_EXTENSION);
            $updir = __DIR__."/../files/";
            $index = 0;
            if(file_exists($updir."/".$name)){
                $name = str_replace(".".$extension,"",$name);
                do{
                    $name = $name."_".$index;
                    $index++;
                }while(file_exists($updir."/".$name.".".$extension));
                $name = $name.".".$extension;  
            }
            if(move_uploaded_file($_FILES["files"]["tmp_name"][$index],$updir."/".$name)){
                $this->file = new Files;
                $this->file->id = 0;
                $this->file->path = "/files/".$name;
                $this->file->task_id = $task_id;
                $this->file->create();
            }
       } 
    }   
        
    }
    public function deleteFile(){
        if(isset($_POST['id'])){
            $id = filter_var($_POST['id'],FILTER_SANITIZE_NUMBER_INT);
            $this->file = Files::find($id);
            if(isset($this->file)){
                unlink($this->file->path);
                $this->file->delete();
                echo json_encode(["Result"=>"Success"]);
                return true;
            }
            return Helper::Error("Error! Something wrrong.");
        }
    }   

    public function get_file(){  
        if(isset($_POST['id']) && isset($_POST['type'])){
            if($this->isAuth()) {
                ob_clean();
                flush();echo  
                json_encode(["Result"=>"Not Authorized!"]);
                return;
            }
            $file = $_POST['type']=="task"? Files::find($_POST['id']): CommentFiles::find($_POST['id']);
           if($file){
            if(file_exists($file->path.'/'.$file->hash)){
                header('Content-Description: File Transfer');
                header('Content-Type: application/octet-stream');
                header("Cache-Control: no-cache, must-revalidate");
                header("Expires: 0");
                header('Content-Disposition: attachment; filename="'.basename($file->name).'"');
                header('Content-Length: ' . filesize($file->path."/".$file->hash));
                header('Pragma: public');
                ob_clean();
                flush();
                readfile($file->path.'/'.$file->hash);
                return;
            }
           }
            
        }
        ob_clean();
        flush();
        return Helper::Error("File doesnt exists");
    }


    private function isAuth(){
        $auth = getallheaders();
        if(!empty($auth)) $auth = $auth["Authorization"];
        $token =  @json_decode($this->crypto(@base64_decode(@urldecode($auth)), '0YDRg9GB0YLQtdC8X9C/0LXRgtGD0YjQsNGA0LA='), true);
        return $token === $this->USER_DATA;
    }
}