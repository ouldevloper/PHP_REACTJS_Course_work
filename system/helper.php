<?php
namespace API\SYSTEM;
class Helper{
    public static function parseAccessToken($data){
        $method = "AES-256-CBC";
        $s_key = '2-mda-9';
        $s_iv = 'TMP-2-mda-9-pro';
        $key = hash('sha256', $s_key);
        $iv = substr(hash('sha256', $s_iv), 0, 16);
        $data = base64_decode($data);
        $res = openssl_decrypt($data, $method, $key, 0, $iv);
        $res = explode("%mda%",$res);
        return $res;
    }

    public static function password($data){
        return hash('sha256',$data);
    }

    public function generate_accessToken($id,$user,$pass){
        $data = $id."%mda%".$user."%mda%".$pass;
        $method = "AES-256-CBC";
        $s_key = '2-mda-9';
        $s_iv = 'TMP-2-mda-9-pro';
        $key = hash('sha256', $s_key);
        $iv = substr(hash('sha256', $s_iv), 0, 16);
        $output = openssl_encrypt($data, $method, $key, 0, $iv);
        return base64_encode($output);
    }

    public static function str_random($lenght=10){
        $pattern = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $lenght = $lenght>strlen($pattern)?strlen($pattern):$lenght;
        return substr(str_shuffle($pattern),0,$lenght);
    }

    public static function now(){
        return (new \DateTime())->format('Y-m-d H:i:s');
    }

    public static function _str($str){
        return htmlentities(strip_tags($str));
    }

    public static function Error($err){
        echo json_encode(["Result"=>$err]);
        return false;
    }

    public static function process_time(){
        // $ru_months = array( '01'=>'Январь', '02'=>'Февраль', '03'=>'Март', '04'=>'Апрель', '05'=>'Май', '06'=>'Июнь', '07'=>'Июль', '08'=>'Август', '09'=>'Сентябрь', '10'=>'Октябрь', '11'=>'Ноябрь', '12'=>'Декабрь' );
        // $m = date("m");
        $date = date(" j-m-Y / H:i");
        return $date; //str_replace("$$",$ru_months[$m],$date);
    }

}