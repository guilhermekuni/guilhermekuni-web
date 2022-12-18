---
layout: ../../layouts/PostLayout.astro
title: 'JavaScript: O que é Hoisting, e porque devemos usar const e let'
pubDate: 2022-07-01
description: 'This is the first post of my new Astro blog.'
author: 'Astro Learner'
image:
    url: 'https://astro.build/assets/blog/astro-1-release-update/cover.jpeg'
    alt: 'The Astro logo with the word One.'
tags: ["astro", "blogging", "learning in public"]
---

Se você desenvolve com a linguagem JavaScript atualmente, provavelmente está acostumado a utilizar `const` e `let` para declarar suas variáveis e sabe que usar `var` não é uma boa prática, mas você já se perguntou o porque?

Uma das principais razões para utilizarmos `const` e `let` é tornar nosso código mais previsível e evitar problemas causados pelo ***Hoisting***, mas antes de entendermos o que é ***Hoisting*** e porque queremos evitá-lo precisamos entender o que é TDZ (Temporal Dead Zone).

## TDZ (Temporal Dead Zone)

TDZ, ou *Temporal Dead Zone*, é a área de um bloco de código onde uma variável é inacessível. Essa área acaba onde a variável é completamente inicializada com um valor.

Considere o exemplo abaixo, ao tentar acessar a variável `fruitName` dentro do `console.log` recebemos um erro de referência, isso porque tentamos acessar a variável em sua *Temporal Dead Zone*, ou seja, tentamos acessar a variável antes de sua inicialização.


```js
{
	console.log(fruitName); // retorna ReferenceError

	let fruitName = "Apple";
}
```

Para ficar mais claro, considere o exemplo:

```js
{
	// TDZ da variável fruitName ****começa aqui pois é o início do bloco
	// TDZ continua nesta linha
	console.log(fruitName); // retorna ReferenceError (TDZ continua nesta linha)
	// TDZ continua nesta linha
	// TDZ continua nesta linha
	let fruitName = "Apple"; // TDZ termina aqui pois a variável foi inicializada
	// TDZ não existe nesta linha
	// TDZ não existe nesta linha
}
```

Por mais contra intuitivo que pareça, em muitos casos **isso é uma coisa boa.** Isso porque é melhor termos um erro em tempo de compilação, onde vamos percebe-lo e corrigí-lo antes de mandarmos nosso código para produção, do que obtermos um valor inesperado (como `undefined`, por exemplo) que muitas vezes resulta em bug difícil de encontrar e corrigir.

Considere o seguinte exemplo, ao tentar acessar a variável `fruitName` antes de atribuirmos um valor não temos um erro de referência, ao invés disso temos o valor `undefined`. Isso acontece porque ao declarar a variável sem atribuirmos um valor, automaticamente ela é inicializada com o valor `undefined`.

```js
let fruitName;

console.log(fruitName); // undefined

fruitName = "Apple";
```

Com isso podemos concluir que, sempre que possível, é interessante inicializar as variáveis no momento da sua declaração e só as acessarmos após isso, considere o exemplo:

```js
let fruitName = "Apple";

console.log(fruitName) // Apple
```

## Hoisting

Ok, mas o que isso tem a ver com **Hoisting** e porque utilizar **var** é uma má prática?

O TDZ de uma variável declarada com `var` é diferente do TDZ das variáveis declaradas com `const` e `let`, basicamente ele começa e termina no início do bloco. Isso acontece porque o JavaScript faz o *hoisting* da declaração da variável para o topo do bloco e a inicializa com o valor `undefined`.

Considere o exemplo:

```js
{
	console.log(fruitName) // undefined

	var fruitName = "Apple";
}
```

Podemos notar no exemplo que conseguimos acessar a variável `fruitName` antes de sua definição. Isso acontece porque o JavaScript “move” a declaração da variável `fruitName` para o topo do bloco e a inicializa com o valor `undefined`, esse processo é chamado de ***Hoisting***.

Basicamente, seria como se estivessemos fazendo isso:

```js
{
	var fruitName = undefined;

	console.log(fruitName) // undefined

	fruitName = "Apple";
}
```

Podemos dizer então que, em JavaScript, *hoisting* é o processo onde as declarações são movidas para o topo do bloco.

Perceba que esse comportamento é muito mais confuso e pode resultar em problemas mais difíceis de entender, pois ao tentar acessar variáveis antes de suas declarações não temos nenhum erro, apenas um valor diferente do que foi atribuído (`undefined`).

Considere agora esse outro exemplo:

```js
{
	var fruitName = "Apple";

	console.log(fruitName); // "Apple"

	function printFruitName() {
		console.log(fruitName); // "undefined";

		var fruitName = "Orange";

		console.log(fruitName); // "Orange"
	}

	printFruitName();
}
```

Como mencionado anteriormente, o **Hoisting** move as declarações das variáveis declaradas com `var` para o topo do bloco, e por esse motivo, o console.log do ínicio do bloco da função `printFruitName` imprime `undefined`. O Hoisting basicamente fez isso:

```js
{
	var fruitName = "Apple";

	console.log(fruitName); // "Apple"

	function printFruitName() {
		var fruitName = undefined;

		console.log(fruitName); "undefined";

		fruitName = "Orange";

		console.log(fruitName); // "Orange"
	}
}
```

## Funções

É importante mencionar que o JavaScript também faz o hoisting

## Conclusão

Declarar variáveis com var pode causar comportamentos inesperados e bugs difíceis de resolver por causa do hoisting. Quando escolhemos declarar nossas variáveis com **const** e **let** evitamos esses problemas já que o JavaScript não faz o hoisting dessas variáveis, dessa forma não conseguimos acessá-las antes de suas declarações.
