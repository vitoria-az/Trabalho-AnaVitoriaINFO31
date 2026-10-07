import test from "node:test"; import assert from "node:assert/strict";
import { INDICADORES, formatarValor } from "../src/dominio.ts";
test("há 3 indicadores fictícios",()=>assert.equal(INDICADORES.length,3));
test("formatação preserva símbolos e espaça estudantes",()=>{ assert.equal(formatarValor(88,"%"),"88%"); assert.equal(formatarValor(7,"estudantes"),"7 estudantes"); });
