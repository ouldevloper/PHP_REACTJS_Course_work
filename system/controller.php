<?php

namespace API\SYSTEM;

class Controller 
{
    protected $userData = null;
    protected $controller;
    protected $action;
    protected $params;
    protected $data;
    protected $USER_DATA;
    
    public function setController($controllerName){
        $this->controller  = $controllerName;
    }
    public function setAction($actionName){
        $this->action = $actionName;
    }
    public function setParams($paramsList){
        $this->params = $paramsList;
    }

    private function get_user_data($id){

        $ch = curl_init();
        $headers = array(
            'Accept: application/json',
            'Content-Type: application/json',
        );
        curl_setopt($ch, CURLOPT_URL, "https://crm.lichishop.com/rest/1/pe1ys43oe0mxs5s0/user.get?ID=".$id);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $body = '{}';
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET"); 
        curl_setopt($ch, CURLOPT_POSTFIELDS,$body);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
        // Timeout in seconds
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
        $aResult = curl_exec($ch);
        curl_close($ch);
        $aResult = json_decode($aResult, true);
        if ( json_last_error() == JSON_ERROR_NONE ) {
            return $aResult['result'];
        }
        return False;
        

    }
    public function notfound(){
        
        header("Content-Type: text/html; charset=UTF-8");
        $html = file_get_contents('index.html');
        echo $html;
    
    }

    
}

