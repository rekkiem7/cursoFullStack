<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..'),
        ]);
    }
    
    public function loginAction(Request $request){
        $helpers= $this->get("app.helpers");
        $jwt_auth=$this->get("app.jwt_auth");
        //Recibir json por post
        $json=$request->get("json", null);
   
        if($json !=null)
        {
            $params= json_decode($json);
            $email=(isset($params->email)) ? $params->email :null;
            $password=(isset($params->password)) ? $params->password :null;
            
            $getHash=(isset($params->getHash)) ? $params->getHash :null;
            $emailConstraint= new Assert\Email(); //validador symfony
            $emailConstraint->message="This email is not valid!!";
            $validate_email=$this->get("validator")->validate($email,$emailConstraint);
            $pwd=hash('sha256',$password);
            if(count($validate_email)==0 && $password!=null)
            {
                if($getHash == null || $getHash == "false")
                {
                    $signup=$jwt_auth->signup($email,$pwd);
                }else{
                    $signup=$jwt_auth->signup($email,$pwd,true);
                }
                return new JsonResponse($signup);
            }else{
                return $helpers->json(array("status"=>"error","data"=>"Login not valid!!"));
            }
        }else{
                return $helpers->json(array("status"=>"error","data"=>"Send json with post !!!"));
        }
    }
  
    public function pruebasAction(Request $request)
    {
        $helpers= $this->get("app.helpers");
        $hash= $request->get("authorization",null);
        $check = $helpers->authCheck($hash);
        var_dump($check);
        die();
        /*$em =$this->getDoctrine()->getManager();//Para trabajar con las entidades BD
        $users=$em->getRepository('BackendBundle:User')->findAll();//Sacamos todos los registros de User
        return $helpers->json($users);*/
    }
   
}
