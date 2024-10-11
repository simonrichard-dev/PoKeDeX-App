import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {RootView} from "@/components/RootView";
import {Row} from "@/components/Row";
import {ThemedText} from "@/components/ThemedText";
import {useFetchQuery} from "@/hooks/useFetchQuery";
import {Colors} from "@/constants/Colors";
import {useThemeColors} from "@/hooks/useThemeColors";
import {getPokemonArtwork, formatWeight, formatSize} from "@/functions/pokemon";
import {Card} from "@/components/Card";
import {PokemonType} from "@/components/pokemon/PokemonType";
import {PokemonSpec} from "@/components/pokemon/PokemonSpec";


export default function Pokemon() {
    const colors = useThemeColors();
    const params = useLocalSearchParams() as {id: string};
    const {data: pokemon} = useFetchQuery("/pokemon/[id]", {id: params.id});
    const {data: species} = useFetchQuery("/pokemon-species/[id]", {id: params.id});
    const mainType = pokemon?.types?.[0].type.name;
    const colorType = mainType ? Colors.type[mainType] : colors.tint;
    const types = pokemon?.types ?? [];
    const bio = species?.flavor_text_entries
        ?.find(({language}) => language.name == 'en')
        ?.flavor_text.replaceAll("\n", ". ");
    return (
        <RootView style={{ backgroundColor: colorType}}>
            <View>
                <Image
                    style={styles.pokeball}
                    source={require("@/assets/images/pokeball_big.png")}
                    width={208}
                    heigth={208}
                    />
                    <Row style={styles.header}>
                        <Pressable onPress={router.back}>
                            <Row gap={8}>
                                <Image
                                    source={require("@/assets/images/back.png")}
                                    width={32}
                                    height={32}
                                />
                                <ThemedText
                                    color="grayWhite"
                                    variant="headline"
                                    style={{ textTransform: "capitalize"
                                }}>
                                    {pokemon?.name}
                                </ThemedText>
                            </Row>
                        </Pressable>
                        <ThemedText color="grayWhite" variant="subtitle2">
                            #{params.id.padStart(3, '0')}
                        </ThemedText>
                    </Row>
                    <View style={styles.body}>
                        <Image
                            source={{uri: getPokemonArtwork(params.id)}}
                            style={[styles.artwork, {width: 200, height: 200}]}
                        />
                    <Card style={styles.card}>
                        <Row gap={16}>
                            {types.map((type) => (
                                <PokemonType name={type.type.name} key={type.type.name} />
                            ))}
                        </Row>
                        <ThemedText variant="subtitle1" style={{ color: colorType }}>
                            About
                        </ThemedText>
                        <Row>
                            <PokemonSpec
                                style={{
                                    borderStyle: "solid",
                                    borderRightWidth: 1,
                                    borderColor: colors.grayLight,
                                }}
                                title={formatWeight(pokemon?.weight)}
                                description="Weight"
                                image={require("@/assets/images/weight.png")}
                            />
                            <PokemonSpec
                                style={{
                                    borderStyle: "solid",
                                    borderRightWidth: 1,
                                    borderColor: colors.grayLight,
                                }}
                                title={formatSize(pokemon?.height)}
                                description="Size"
                                image={require("@/assets/images/size.png")}
                            />
                            <PokemonSpec
                                title={pokemon?.moves
                                    .slice(0, 2)
                                    .map((m) => m.move.name)
                                    .join("\n")}
                                description="Moves"
                            />
                        </Row>

                        {/* About */}
                        <ThemedText>{bio}</ThemedText>
                        <ThemedText variant="subtitle1" style={{ color: colorType }}>
                            Base stats
                        </ThemedText>
                    </Card>
                    </View>
                    <Text>Pokemon {params.id}</Text>
            </View>
        </RootView>
    );
}

const styles = StyleSheet.create ({
    header: {
        margin: 20,
        justifyContent: "space-between"
    },
    pokeball: {
        opacity: .1,
        position: 'absolute',
        right: 8,
        top: 8,
    },
    artwork: {
        alignSelf: "center",
        position: "absolute",
        top: -140,
        zIndex: 2,
    },
    body: {
        marginTop: 144,
    },
    card: {
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 60,
        gap: 16,
    },
});