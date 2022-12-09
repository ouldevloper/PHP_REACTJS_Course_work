<?php

spl_autoload_register(function($className){
	
    $class = $className;
    if(strpos($class,"SYSTEM")){

        $class = str_replace("API\\SYSTEM\\","",$class);

        $class =strtolower($class);

        $class = __SYS__.DS.$class.'.php';

        

    }else if(strpos($class,"CONTROLLERS")){

        $class = str_replace("API\\CONTROLLERS\\","",$class);

        $class =strtolower($class);

        $class = __CTL__.DS.$class.'.php';

    }else if(strpos($class,"MODELS")){

        $class = str_replace("API\\MODELS\\","",$class);

        $class =strtolower($class);

        $class = __MDL__.DS.$class.'.php';

    }else if(strpos($class,"Bitrix24")==0){
	

        $class = __DIR__."/..".DS.$class.'.php';
	$class = str_replace("\\","/",$class);
    }



    if(file_exists($class)){

    	@require_once $class;

    }		

});



