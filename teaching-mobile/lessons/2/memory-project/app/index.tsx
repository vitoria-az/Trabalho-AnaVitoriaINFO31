import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// TODO 1: troque string por "Relato" | "Lugar" | "Celebração".
type CategoriaMemoria = string;

interface Memoria {
  id: number;
  titulo: string;
  comunidade: string;
  categoria: CategoriaMemoria;
  resumo: string;
  // TODO 2: acrescente ano como propriedade number opcional.
}

// Dados inteiramente fictícios para uso didático.
const MEMORIAS: Memoria[] = [
  {
    id: 1,
    titulo: "História do caminho antigo",
    comunidade: "Comunidade Fictícia A",
    categoria: "Relato",
    resumo: "Um relato simulado sobre caminhos usados entre casas e roçados.",
  },
  {
    id: 2,
    titulo: "Praça das conversas",
    comunidade: "Comunidade Fictícia B",
    categoria: "Lugar",
    resumo: "Uma descrição simulada de um espaço de encontro comunitário.",
  },
  {
    id: 3,
    titulo: "Celebração da colheita",
    comunidade: "Comunidade Fictícia C",
    categoria: "Celebração",
    resumo: "Um registro simulado sobre partilha, música e memória coletiva.",
  },
];

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
      {/* TODO 3: crie criarLegenda(memoria: Memoria): string e use aqui. */}
      <Text style={styles.legenda}>
        {memoria.categoria} · {memoria.comunidade}
      </Text>
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

  function alternarSelecao(id: number): void {
    // TODO 4: se o mesmo id já estiver selecionado, grave null.
    setIdSelecionada(id);
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
            {/* TODO 5: mostre o ano somente quando ele existir. */}
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

