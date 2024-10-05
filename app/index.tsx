import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColors} from "@/hooks/useThemeColors";
import {Card} from "@/components/Card";
import {PokemonCard} from "@/components/pokemon/PokemonCard";
import {useFetchQuery, useInfiniteFetchQuery} from "@/hooks/useFetchQuery";
import {getPokemonId} from "@/functions/pokemon";
import {SearchBar} from "@/components/SearchBar";
import {useState} from "react";
import {Row} from "@/components/Row";
import {SortButton} from "@/components/SortButton";



export default function Index() {
    const colors = useThemeColors();
    const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery('/pokemon?limit=21');
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<"id" | "name">("id");
    const pokemons = data?.pages.flatMap((page) => page.results.map(r => ({name: r.name, id: getPokemonId(r.url)}))) ?? [];
    const filteredPokemons = [
        ...(search
             ? pokemons.filter(
                 (p) =>
                    p.name.includes(search.toLowerCase()) ||
                    p.id.toString() == search,
               )
             : pokemons),
    ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
        <Row style={styles.header} gap={16}>
            <Image source={require("@/assets/images/pokeball-100.png")} style={{width: 24, height: 24}}/>
            <ThemedText variant="headline" color="grayLight">
            PoKeDeX
            </ThemedText>
        </Row>
        <Row gap={16}>
            <SearchBar value={search} onChange={setSearch} />
            <SortButton value={sortKey} onChange={setSortKey} />
        </Row>
        <Card style={styles.body}>
            <FlatList
            data={filteredPokemons}
            numColumns={3}
            contentContainerStyle={[styles.gridGap, styles.list]}
            columnWrapperStyle={styles.gridGap}
            ListFooterComponent={
                isFetching ? <ActivityIndicator color={colors.tint}/> : null
            }
            onEndReached={search ? undefined : () => fetchNextPage()}
            renderItem={({ item }) => <PokemonCard id={item.id} name={item.name} style={{flex: 1/3}}/>}
            keyExtractor={(item) => item.id.toString()}
            />
        </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
    },
    header: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    body: {
        flex: 1,
        marginTop: 16,
    },
    gridGap: {
        gap: 8,
    },
    list: {
        padding: 12,
    }
})
