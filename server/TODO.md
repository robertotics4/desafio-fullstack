# Usuários (Accounts)
**RF**
[x] Deve ser possível cadastrar um novo usuário.

**RNF**
[x] Utilizar o Argon2 para criptografar as senhas dos usuários.

**RN**
[x] Não deve ser possível cadastrar um novo usuário com um email já existente.

# Autenticação (Sessions)
**RF**
[x] Deve ser possível criar sessão de autenticação.

**RNF**
[x] Utilizar o JSONWebToken para validação e autorização.
[x] O token jwt deve expirar em 1 dia.

**RN**
[x] Deve ser possível criar uma sessão informando o e-mail e a senha.

# Poltronas (Seats)
**RF**
[x] Deve ser possível cadastrar poltronas para o teatro através de uma seed.

**RN**
[x] Não deve ser possível cadastrar novas poltronas sem informar a fileira e o número.
[x] As fileiras devem conter apenas 1 caractere
[x] Não deve ser possível cadastrar novas poltronas com a combinação "fileira + número" já existente
[x] Não deve ser possível cadastrar poltronas se o usuário não estiver logado
[x] Não deve ser possível cadastrar poltronas se o usuário não for administrador
[x] Não deve ser possível criar uma sessão com usuário e senha inválidos.

# Espetáculos (Presentations)
**RF**
[x] Deve ser possível cadastrar um novo espetáculo.
[x] Deve ser possível listar todos os espetáculos
[x] Deve ser possível buscar os espetáculos pela data
[x] Deve ser possível listar os espetáculos pelo nome
[ ] Deve ser possível cadastrar uma imagem para o espetáculo.
[ ] Deve ser possível editar as informações de um espetáculo.
[ ] Deve ser possível vincular as poltronas aos espetáculos automaticamente após a criação.
[ ] As poltronas vinculadas aos espetáculos deverão iniciar com a disponibilidade = true


**RNF**
[ ] Utilizar o Multer para upload da imagem do espetáculo.

**RN**
[x] Não deve ser possível cadastrar espetáculos com a mesma data.
[x] Não deve ser possível cadastrar um novo espetáculo sem que seja informado o nome, descrição e data.
[x] Não deve ser possível cadastrar um novo espetáculo se já houver um outro espetáculo no mesmo dia.
[x] Não deve ser possível criar espetáculos com a data inferior à do dia atual
[ ] Não deve ser possível salvar as alterações sem que seja informado o nome, descrição e data.
[ ] Não deve ser possível salvar as alterações com uma data que já utilizada num outro espetáculo.
[ ] Não deve ser possível cadastrar poltronas se o usuário não estiver logado
[ ] Não deve ser possível cadastrar poltronas se o usuário não for administrador

# Reservas (Reservations)
**RF**
[ ] Deve ser possível reservar poltronas por espetáculo.
[ ] Deve ser possível cancelar poltronas por espetáculo.
[ ] Deve ser possível mostrar o total de lugares reservados por espetáculo.
[ ] Deve ser possível mostrar o total de lugares disponíveis por espetáculo.
[ ] O valor padrão de reserva é R$ 27,99

**RN**
[ ] Não deve ser possível reservar poltronas que já estejam reservadas
[ ] Não deve ser possível efetuar uma reserva sem informar o id do usuário, o id das poltronas e o id do espetáculo

# Financeiro (Finance)

[ ] Deve ser possível exibir o total de arrecadação (Sendo que cada poltrona reservada custe R$: 27,99)
[ ] Deve ser possível calcular e exibir os impostos (14,33%)
