<?php
namespace App\src\controllers;

use App\src\models\LinkRepository;
use App\src\models\LoggerRepository;

class LinkController extends Controller
{
    private $loggerRepo;
    public function __construct(LinkRepository $linkRepo, LoggerRepository $loggerRepo)
    {
        parent::__construct($linkRepo);
        $this->loggerRepo = $loggerRepo;
        mt_srand();
    }

    public function create(): array
    {
        $code = 400;
        $msg = "Une erreur s'est produite lors de la génération du lien";
        $data = [];
        $ip = $this->getRealIPAddr();
        $creator = $this->loggerRepo->findBy('ip', $ip);
        if($creator) {
            $link = $this->repository->findLinkNotUsed($creator->id);
            if($link === '') {
                do {
                    $link = $this->make_password(30) . time();
                    $found = $this->repository->findBy('link', $link);
                } while(!is_null($found));
                $this->repository->insert(['creator' => $creator->id, 'link' => $link]);
            }
            $code = 200;
            $data['link'] = $link;
            $msg = 'Success';
        }
        return $this->response($code, $msg, $data);
    }

    private function make_password($length): string {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function join(): array {
        $code = 400;
        $msg = "Lien manquant, pour rejoindre la partie.";
        if(isset($_REQUEST['link'])) {
            $msg = "Une erreur s'est produite, impossible de rejoindre la partie.";
            $ip = $this->getRealIPAddr();
            $adversary = $this->loggerRepo->findBy('ip', $ip);
            if($adversary) {
                $game = $this->repository->findBy('link', $_REQUEST['link']);
                if($game) {
                    $msg = "Cette partie est terminée.";
                    if(is_null($game->adversary)) {
                        $this->repository->join(['link' => $_REQUEST['link'], 'adversary' => $adversary->id]);
                        $code = 200;
                        $msg = 'Success';
                    }
                }
            }
        }
        return $this->response($code, $msg);
    }
}