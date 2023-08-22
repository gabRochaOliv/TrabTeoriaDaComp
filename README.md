# Relatório Implementação: Simulador de Autômatos Finitos
 
## Simulador de Autômato Finito Determinístico (AFD) 
### Descrição da Ferramenta 
Essa ferramenta foi feita em JavaScript. Utilizando a biblioteca `fs` para manipular arquivos. As funções `readJSONFile` e `readCSVFile` lêem arquivos JSON e CSV para definir o autômato e os testes. `runAutomaton` simula execução, seguindo transições até um estado final. A função principal, `main`, processa entradas e valida argumentos. Os testes são medidos com `process.hrtime()`. Resultados são registrados e escritos em CSV.
 
### Seu Funcionamento
Em resumo, o simulador lê definições e entradas de autômatos, executa os autômatos nas entradas, registra os resultados e tempos de execução, e finalmente escreve esses resultados em um arquivo. 

### Exemplo de Uso
Como definido no próprio "arquivo_do_automato.aut" o estado inicial o estado final e as transições, ele faz o teste com os seguintes caracteres inseridos no "arquivo_de_testes.in":
1. ba;1
2. aaaabbbbbaaaaa;
3. abababab;0
4. bbbbbbbb;0
5. aaaaaaaaaaaa;0
6. aaaaabaaaaa;1
   
Assim, fornecendo no "arquivo_de_saida.out" as seguintes saídas:

1. ba;1;1;0.091
2. aaaabbbbbaaaaa;1;1;0.015
3. abababab;0;0;0.006
4. bbbbbbbb;0;0;0.018
5. aaaaaaaaaaaa;0;0;0.009
6. aaaaabaaaaa;1;1;0.005

## Simulador de Autômato Finito Não Determinístico (AFND)
### Descrição da Ferramenta
Essa é uma ferramenta que diferentemente do autômato finito determinístico (AFD), que possui um único estado de destino para cada combinação de estado atual e entrada, o AFND pode ter múltiplos destinos para a mesma combinação. A ferramenta lê definições de autômatos em JSON e entradas de teste em CSV. A função runAutomaton utiliza conjuntos para rastrear os estados atuais e calcular os próximos estados possíveis com base nas transições. Essa abordagem permite lidar com múltiplos caminhos de execução. Assim como antes, a função principal coordena a execução, mede os tempos de execução e escreve os resultados em um arquivo CSV de saída. Em resumo, essa ferramenta é direcionada a AFNDs, trazendo mais expressividade, mas também maior complexidade em comparação com o simulador anterior para AFDs.

### Seu funcionamento
A função `runAutomaton` usa conjuntos para rastrear estados atuais e calcular os próximos estados possíveis, considerando todas as transições relevantes para cada entrada. Isso permite lidar com múltiplos caminhos de execução simultaneamente. Ja na função principal, a `main`, coordena as operações, verifica argumentos da linha de comando e utiliza as funções de leitura e execução para processar os arquivos. Ela mede os tempos de execução usando `process.hrtime()` e registra os resultados, escrevendo-os em um arquivo CSV de saída.

### Exemplo de Uso
Como também definido no "arquivo_do_automato.aut" o estado inicial o estado final e as transições, ele faz o teste com os seguintes caracteres inseridos no "arquivo_de_testes.in":
1. aaaabbbb;1
2. aaaaaaaaaaa;1
3. aaaabb;1
4. cccccccccccccc;0
5. a;0

Sendo assim, fornecido no "arquivo_de_saida.out" as seguintes saídas:

1. aaaabbbb;0;0;0.172
2. aaaaaaaaaaa;1;1;0.218
3. aaaabb;0;0;0.022
4. cccccccccccccc;0;0;0.007
5. a;0;0;0.003

## Simulador Geral 
### Descrição da Ferramenta 

O simulador geral lê qualquer tipo de autômato, tanto não deterministico, quanto determinístico, quanto com movimento vazio. Ela lê definições de autômatos a partir de arquivos JSON e entradas de teste de arquivos CSV, assim como os outros, mas a diferença notável neste código é a capacidade do autômato para transições vazias, onde ele pode se mover sem consumir entrada.  

### Seu funcionamento 

O funcionamento do código baseia-se na utilização de uma pilha para simular as transições do AFND, permitindo movimentos vazios. O movimento vazio é tratado dentro da lógica de filtragem das transições, fazendo com que o código verifique as transições para um determinado estado e caractere de entrada, incluindo a transições em que o caractere de leitura `t.read` é igual ao caractere atual `char` ou onde o caractere de leitura é vazio `''`. Esta condição é o ponto crucial que permite ao autômato realizar o movimento vazio. 

### Exemplo de uso
Assim como também foi definido nas outras duas ferramentas o "arquivo_do_automato.aut" contendo o estado inicial o estado final e as transições, ele também faz o teste com os seguintes caracteres inseridos no "arquivo_de_testes.in":

1. aaaabbbba;1
2. aaaaaaaaaaa;1
3. aaaabba;1
4. cccccccccccccc;0
5. aa;1
6. aaaaabbb;0

Sendo assim, também fornecido no "arquivo_de_saida.out" as seguintes saídas:

1. aaaabbbba;1;1;0.452
2. aaaaaaaaaaa;1;1;0.066
3. aaaabba;1;1;0.043
4. cccccccccccccc;0;0;0.012
5. aa;1;1;0.009
6. aaaaabbb;0;0;0.042

