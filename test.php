<?php


if($_SERVER['REQUEST_METHOD'] == 'POST')
{
  if($_POST['id'] == 101) {
    $data = [
      '_idFrom' => 101,
      '_idTo' => 100,
      'img' => 'user-2.jpg',
      'name' => 'Джесика',
      'msg' => 'Сообщения от 101 ко мне'
    ];
    echo json_encode($data);
  } elseif($_POST['id'] == 102){
    $data = [
      '_idFrom' => 102,
      '_idTo' => 100,
      'img' => 'user-1.jpg',
      'name' => 'Дима',
      'msg' => 'Сообщения от 102 ко мне'
    ];
    echo json_encode($data);
  } else {
    $data = [
      '_idFrom' => 'some',
      '_idTo' => 100,
      'img' => 'user-3.jpg',
      'name' => 'Другой',
      'msg' => 'Сообщения от другого пользователя ко мне'
    ];
    echo json_encode($data);    
  };
  
}