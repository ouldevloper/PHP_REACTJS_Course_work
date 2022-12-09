<?php

namespace API\SYSTEM;

use Exception;

class Uploader
{
    private $file_tempPath          = [];
    private $file_extentions        = [];
    private $file_name             = [];
    private $base_dir               = "";
    private $str_len                = 1;

    public function __construct($base_dir, $str_len = 10)
    {
        $this->base_dir = $base_dir;
        $this->str_len = $str_len;
        if (isset($_FILES['files'])) {
            foreach ($_FILES["files"]['name'] as $name) {
                $this->file_name[] = $name;
                $this->file_extentions[] = pathinfo($name, PATHINFO_EXTENSION);
            }
            foreach ($_FILES["files"]['tmp_name'] as $tmp_name) {
                $this->file_tempPath[] = $tmp_name;
            }
        }
    }

    public function upload($key="files")
    {
        $f = [];
        $dir =  $this->base_dir."/".date('Y/F/');
        if(!file_exists($dir)){
            mkdir($dir,0777,true);
        }
        $lenght = \count($this->file_name);
        for ($i = 0; $i < $lenght; $i++) {      
            $name = $this->generateName(15);
            do {
                $name =  $this->generateName(15);
            } while (\file_exists($dir . "/" . $name));

            if (\move_uploaded_file($this->file_tempPath[$i], $dir .  $name)) {
                $f[]=['name'=>$this->file_name[$i],'path'=>$dir,'hash'=>$name];
            }
        }
        return $f;
    }
    private function generateName($lenght = 20)
    {
        $bytes = random_bytes($lenght);
        return time() . bin2hex($bytes);
    }
}
