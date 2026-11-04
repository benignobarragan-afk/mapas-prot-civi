import React, { useState } from 'react';
import { SafeAreaView, SectionList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { EDIFICIOS } from './data';

export default function App() {
  const [edificios, setEdificios] = useState(EDIFICIOS);

  const alternar = (edificioId, elementoId) =>
    setEdificios((prev) =>
      prev.map((e) =>
        e.id !== edificioId
          ? e
          : { ...e, elementos: e.elementos.map((x) => (x.id === elementoId ? { ...x, ok: !x.ok } : x)) }
      )
    );

  const secciones = edificios.map((e) => ({ id: e.id, title: e.nombre, data: e.elementos }));
  const pendientes = edificios.reduce((n, e) => n + e.elementos.filter((x) => !x.ok).length, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Protección Civil CUCS</Text>
      <Text style={styles.resumen}>Elementos con revisión pendiente: {pendientes}</Text>
      <SectionList
        sections={secciones}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => <Text style={styles.seccion}>{section.title}</Text>}
        renderItem={({ item, section }) => (
          <TouchableOpacity style={styles.item} onPress={() => alternar(section.id, item.id)}>
            <View style={{ flex: 1 }}>
              <Text style={styles.tipo}>{item.tipo}</Text>
              <Text>{item.ubicacion}</Text>
            </View>
            <Text style={{ color: item.ok ? 'green' : 'red', fontWeight: 'bold' }}>
              {item.ok ? 'Vigente' : 'Pendiente'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  resumen: { textAlign: 'center', marginVertical: 8 },
  seccion: { backgroundColor: '#eee', padding: 8, fontWeight: 'bold' },
  item: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#ddd' },
  tipo: { fontWeight: '600' },
});
