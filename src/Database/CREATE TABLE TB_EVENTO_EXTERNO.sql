create table evento_externo.TB_EVENTO_EXTERNO (
    CO_SEQ_EVENTO int primary key identity  (1, 1),
    NO_EVENTO varchar(255) not null,
    DS_EMAIL varchar(50) not null,
    DS_EVENTO varchar(500),
    DS_WEBSITE varchar(50),
    --foreign key
    CO_RA int not null,
    NU_PUBLICO_MAXIMO int not null,
    NU_IDADE_MINIMA int not null,
    NU_QUANTIDADE_INGRESSO int,
    JS_NATUREZA_EVENTO varchar(max),
        CONSTRAINT [JS_NATUREZA_EVENTO should be formatted as JSON]
        CHECK (ISJSON(JS_NATUREZA_EVENTO) > 0),
    JS_CARACTERISTICAS_LOCAL varchar(max),
        CONSTRAINT [JS_CARACTERISTICAS_LOCAL should be formatted as JSON]
        CHECK (ISJSON(JS_CARACTERISTICAS_LOCAL) > 0),
    DS_INFORMACOES_ADICIONAIS varchar(500),
);

DROP TABLE evento_externo.TB_EVENTO_EXTERNO