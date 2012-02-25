<?php

require_once 'Db/Base.php';

class Perfil extends Base {

    private     $nome = null;
    protected   $table = "tipo_despesa";

    public function getNome() {
        return $this->nome;
    }

    public function setNome($nome) {
        $this->nome = $nome;
    }

    public function insert() {
        
        $data = json_decode($_POST['data']);
        
        $db = $this->getDb();
        $stm = $db->prepare('Insert into ' . $this->getTable() . ' (nome) Values(:nome)');
        $stm->bindValue(':nome', $data->nome);
        $stm->execute();

        $result = $stm->fetch(\PDO::FETCH_ASSOC);

        $insert = $db->lastInsertId();
        
        $msg = $insert ? 'Registro(s) inserido(s) com sucesso' : 'Erro ao inserir o registro, tente novamente.';
        
        $newData = $data;
        $newData->id = $insert;

        echo json_encode(array(
            "success" => $insert,
            "message" => $msg,
            "data" => $newData
        ));
    }

    public function update() {
        
        $data = json_decode($_POST['data']);
        
        $db = $this->getDb();
        $stm = $db->prepare('update ' . $this->getTable() . ' set nome=:nome where id=:id');
        $stm->bindValue(':id', $data->id);
        $stm->bindValue(':nome', $data->nome);
        $update = $stm->execute();
        
        $msg = $update ? 'Registro(s) atualizado(s) com sucesso' : 'Erro ao atualizar, tente novamente.';

        echo json_encode(array(
            "success" => $update,
            "message" => $msg,
            "data" => $data
        ));
    }
}

new Perfil();