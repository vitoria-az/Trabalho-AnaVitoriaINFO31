import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// TODO 1: Restringindo a união de literais para categorias válidas
type CategoriaMemoria = "Relato" | "Lugar" | "Celebração";

interface Memoria {
  id: number;
  titulo: string;
  comunidade: string;
  categoria: CategoriaMemoria;
  resumo: string;
  // TODO 2: Adicionando propriedade 'ano' como opcional
  ano?: number;
}

// Dados inteiramente fictícios (inclui o Desafio Opcional: 4ª memória)
const MEMORIAS: Memoria[] = [
  {
    id: 1,
    titulo: "História do caminho antigo",
    comunidade: "Comunidade Fictícia A",
    categoria: "Relato",
    resumo: "Um relato simulado sobre caminhos usados entre casas e roçados.",
    ano: 1985,
  },
  {
    id: 2,
    titulo: "Praça das conversas",
    comunidade: "Comunidade Fictícia B",
    categoria: "Lugar",
    resumo: "Uma descrição simulada de um espaço de encontro comunitário.",
    // Sem ano (propriedade opcional)
  },
  {
    id: 3,
    titulo: "Celebração da colheita",
    comunidade: "Comunidade Fictícia C",
    categoria: "Celebração",
    resumo: "Um registro simulado sobre partilha, música e memória coletiva.",
    ano: 2012,
  },
  {
    id: 4,
    titulo: "Encontro dos saberes",
    comunidade: "Comunidade Fictícia D",
    categoria: "Celebração",
    resumo: "Uma reunião anual para troca de experiências e rituais comunitários.",
    ano: 2019,
  },
];

// TODO 3: Função tipada para formatação da legenda
function criarLegenda(memoria: Memoria): string {
  if (memoria.ano) {
    return `${memoria.categoria} · ${memoria.comunidade} · ${memoria.ano}`;
  }
  return `${memoria.categoria} · ${memoria.comunidade}`;
}

type CartaoMemoriaProps = {
  memoria: Memoria;
  selecionada: boolean;
  aoSelecionar: (id: number) => void;
};

function CartaoMemoria({
  memoria,
  selecionada,
  aoSelecionar,
}: CartaoMemoriaProps) {
  return (
    <Pressable
      onPress={() => aoSelecionar(memoria.id)}
      style={[styles.cartao, selecionada && styles.cartaoSelecionado]}
    >
      <Text style={styles.tituloCartao}>{memoria.titulo}</Text>
      {/* TODO 3: Usando a função criarLegenda */}
      <Text style={styles.legenda}>{criarLegenda(memoria)}</Text>
      <Text style={styles.acao}>
        {selecionada ? "Toque para fechar" : "Toque para conhecer"}
      </Text>
    </Pressable>
  );
}

export default function Index() {
  const [idSelecionada, setIdSelecionada] = useState<number | null>(null);

  const memoriaSelecionada = MEMORIAS.find(
    (memoria) => memoria.id === idSelecionada,
  );

  // TODO 4: Alterna a seleção (remove se clicar na mesma, altera se for outra)
  function alternarSelecao(id: number): void {
    setIdSelecionada((prevId) => (prevId === id ? null : id));
  }

  return (
    <SafeAreaView style={styles.tela}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.marca}>IFMA · PROTÓTIPO DIDÁTICO</Text>
        <Text style={styles.titulo}>Memórias Quilombolas</Text>
        <Text style={styles.introducao}>
          Selecione um registro fictício para visualizar seus detalhes.
        </Text>

        <View style={styles.lista}>
          {MEMORIAS.map((memoria) => (
            <CartaoMemoria
              key={memoria.id}
              memoria={memoria}
              selecionada={memoria.id === idSelecionada}
              aoSelecionar={alternarSelecao}
            />
          ))}
        </View>

        {memoriaSelecionada ? (
          <View style={styles.detalhes}>
            <Text style={styles.rotuloDetalhes}>MEMÓRIA SELECIONADA</Text>
            <Text style={styles.tituloDetalhes}>
              {memoriaSelecionada.titulo}
            </Text>
            <Text style={styles.textoDetalhes}>
              {memoriaSelecionada.resumo}
            </Text>
            {/* TODO 5: Exibição condicional do ano apenas se informado */}
            {memoriaSelecionada.ano !== undefined && (
              <Text style={styles.anoDetalhes}>
                Ano do registro: {memoriaSelecionada.ano}
              </Text>
            )}
          </View>
        ) : (
          <Text style={styles.vazio}>Nenhuma memória selecionada.</Text>
        )}

        <Text style={styles.aviso}>
          Dados fictícios: não representam comunidades ou acontecimentos reais.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  conteudo: {
    padding: 20,
    paddingBottom: 36,
  },
  marca: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  titulo: {
    color: "#166534",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 6,
  },
  introducao: {
    color: "#334155",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
  },
  lista: {
    marginTop: 20,
  },
  cartao: {
    backgroundColor: "#FFFFFF",
    borderColor: "#CBD5E1",
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
    padding: 16,
  },
  cartaoSelecionado: {
    backgroundColor: "#F0FDF4",
    borderColor: "#2F9E41",
  },
  tituloCartao: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "700",
  },
  legenda: {
    color: "#475569",
    fontSize: 14,
    marginTop: 5,
  },
  acao: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10,
  },
  detalhes: {
    backgroundColor: "#166534",
    borderRadius: 12,
    marginTop: 8,
    padding: 18,
  },
  rotuloDetalhes: {
    color: "#DCFCE7",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  tituloDetalhes: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 5,
  },
  textoDetalhes: {
    color: "#F0FDF4",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  anoDetalhes: {
    color: "#DCFCE7",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  vazio: {
    color: "#64748B",
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },
  aviso: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 20,
    textAlign: "center",
  },
});