<?php
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");


        //$thing = json_decode(file_get_contents('php://input'), true);
        class thing
        {
                var $name;
                var $code;
        }

        $obj = new thing;

        header('Content-type: application/json');
        $obj = json_encode($obj);
        echo '{"name": "bob"}';
?>