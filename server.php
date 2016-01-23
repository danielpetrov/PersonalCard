<?php
include_once "data.php";

$numberOfElementsInData = count($data);

if($_GET){
    $requestedId = $_GET["id"];

    if($requestedId < 0 || $numberOfElementsInData <= $requestedId){
        if($requestedId < 0){
            echo json_encode($data[0]);
        } else {
            echo json_encode($data[$numberOfElementsInData - 1]);
        }
    } else {
        echo json_encode($data[$requestedId]);
    }
} else {
    echo json_encode($data[0]);
}