import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartaoIndicador } from "../components/CartaoIndicador";
import { INDICADORES } from "../src/dominio";

export default function Index() {
  const [somenteAtencao, setSomenteAtencao] = useState<boolean>(false);
  const indicadoresVisiveis = somenteAtencao
    ? INDICADORES.filter((indicador) => indicador.situacao === "atencao")
    : INDICADORES;

  function alternarFiltro(): void { setSomenteAtencao((valorAtual) => !valorAtual); }

  return (
    <SafeAreaView style={styles.tela}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.marca}>IFMA · PROTÓTIPO DIDÁTICO</Text>
        <View style={styles.cabecalho}>
          <View style={styles.textosCabecalho}>
            <Text style={styles.titulo}>Painel EDA</Text>
            <Text style={styles.introducao}>Indicadores simulados de permanência estudantil.</Text>
          </View>
          <Image
            source={require("../assets/images/painel-didatico.png")}
            style={styles.imagem}
            accessibilityIgnoresInvertColors
            accessibilityLabel="Ilustração decorativa do painel de indicadores"
          />
        </View>
        <Text style={styles.aviso}>DADOS FICTÍCIOS E AGREGADOS · Não representam uma turma real.</Text>

        <View style={styles.controles}>
          <Pressable
            onPress={alternarFiltro}
            accessibilityLabel={somenteAtencao ? "Mostrar todos os indicadores" : "Mostrar somente indicadores em atenção"}
            accessibilityRole="button"
            accessibilityState={{ selected: somenteAtencao }}
            style={({ pressed }) => [
              styles.botao,
              somenteAtencao && styles.botaoAtivo,
              pressed && styles.botaoPressionado,
            ]}
          >
            <Text style={[styles.textoBotao, somenteAtencao && styles.textoBotaoAtivo]}>
              {somenteAtencao ? "Mostrar todos" : "Somente atenção"}
            </Text>
          </Pressable>
          <Text style={styles.contagem} accessibilityLiveRegion="polite">
            {somenteAtencao ? "Filtro: atenção." : "Filtro: todos."} {indicadoresVisiveis.length} exibidos.
          </Text>
        </View>

        <View style={styles.lista}>
          {indicadoresVisiveis.map((indicador) => (
            <CartaoIndicador key={indicador.id} indicador={indicador} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#F8FAFC" },
  conteudo: { padding: 20, paddingBottom: 36, width: "100%", maxWidth: 720, alignSelf: "center" },
  marca: { color: "#B91C1C", fontSize: 12, fontWeight: "700" },
  cabecalho: { alignItems: "center", flexDirection: "row", gap: 16, marginTop: 6 },
  textosCabecalho: { flex: 1 },
  titulo: { color: "#166534", fontSize: 30, fontWeight: "800", marginTop: 6 },
  introducao: { color: "#334155", fontSize: 16, lineHeight: 23, marginTop: 8 },
  imagem: { borderRadius: 12, height: 96, width: 96 },
  aviso: { color: "#64748B", fontSize: 12, lineHeight: 18, marginTop: 8 },
  controles: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  botao: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#166534", borderRadius: 999, borderWidth: 2, justifyContent: "center", minHeight: 48, paddingHorizontal: 16 },
  botaoAtivo: { backgroundColor: "#166534" },
  botaoPressionado: { opacity: 0.65, transform: [{ scale: 0.98 }] },
  textoBotao: { color: "#166534", fontSize: 14, fontWeight: "700" },
  textoBotaoAtivo: { color: "#FFFFFF" },
  contagem: { color: "#64748B", fontSize: 14 },
  lista: { marginTop: 16 },
});
