import { registerEnumType } from "@nestjs/graphql";

enum t {
    hi,
}

export enum Tags {
    /*                 */
    /* S O F T W A R E */
    /*                 */
    /* T E R M S */
    PROGRAMMER = "PROGRAMMER",
    DEVELOPER = "DEVELOPER",
    SOFTWARE = "SOFTWARE",
    /* L A N G U A G E S */
    ASSEMBLY = "ASSEMBLY",
    C_LANG = "C_LANG",
    C_PLUS_PLUS = "C_PLUS_PLUS",
    C_SHARP = "C_SHARP",
    D_SHARP = "D_SHARP",
    ELIXIR_LANG = "ELIXIR_LANG",
    ERLANG = "ERLANG",
    F_SHARP = "F_SHARP",
    GO_LANG = "GO_LANG",
    GIT = "GIT",
    GRAPHQL = "GRAPHQL",
    HASKELL = "HASKELL",
    JAVASCRIPT = "JAVASCRIPT",
    JAVA = "JAVA",
    NO_SQL = "NO_SQL",
    OBJECTIVE_C = "OBJECTIVE_C",
    KOTLIN = "KOTLIN",
    PHP = "PHP",
    PYTHON = "PYTHON",
    Q_SHARP = "Q_SHARP",
    RUST = "RUST",
    R_LANG = "R_LANG",
    SQL = "SQL",
    SWIFT = "SQIFT",
    TYPESCRIPT = "TYPESCRIPT",
    /* F R A M E W O R K S */
    ANGULAR_JS = "ANGULAR_JS",
    ANGULAR = "ANGULAR",
    REACT_NATIVE = "REACT_NATIVE",
    REACT = "REACT",
    NEXT_JS = "NEXT_JS",
    NUXT_JS = "NUXT_JS",
    NEST_JS = "NEST_JS",
    NODE_JS = "NODE_JS",
    VUE_JS = "VUE_JS",
    SVELTE = "SVELTE",
    GATSBY = "GATSBY",
    /*             */
    /* F I E L D S */
    /*             */
    SCIENCE = "SCIENCE",
    PHYSICS = "PHYSICS",
    CHEMISTRY = "CHEMISTRY",
    MATHEMATICS = "MATHEMATICS",
    /*                       */
    /* O C C U P A T I O N S */
    /*                       */
    YOUTUBE = "YOUTUBE",
    YOUTUBER = "YOUTUBER",
}

registerEnumType(Tags, {
    name: "Tags",
});
