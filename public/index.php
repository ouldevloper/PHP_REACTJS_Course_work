<?php






//session_start();

use API\SYSTEM\app;

use API\SYSTEM\Helper;



require_once "../configurations/config.php";

require_once "../system/autoloader.php";

require_once "../configurations/web.php";









header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: *");




$app = App::newApp();

$app->run();

