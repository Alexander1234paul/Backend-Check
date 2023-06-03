
/*==============================================================*/
/* Table: TBL_ALMACENES                                         */
/*==============================================================*/
create table TBL_ALMACENES (
   ID_ALMACEN           SERIAL               not null,
   ID_EMPRESA           Integer                 null,
   NOMBRE               VARCHAR(50)          null,
   DIRECCION            VARCHAR(100)         null,
   TELEFONO             VARCHAR(10)          null,
   constraint PK_TBL_ALMACENES primary key (ID_ALMACEN)
);

/*==============================================================*/
/* Table: TBL_CATEGORIAS                                        */
/*==============================================================*/
create table TBL_CATEGORIAS (
   ID_CATEGORIA         SERIAL not null,
   TBL_ID_CATEGORIA     Integer                 null,
   DESCRIPCION          VARCHAR(50)          null,
   constraint PK_TBL_CATEGORIAS primary key (ID_CATEGORIA)
);

/*==============================================================*/
/* Table: TBL_CLIENTES                                          */
/*==============================================================*/
create table TBL_CLIENTES (
   ID_CLIENTE           SERIAL not null,
   ID_EMPRESA           Integer                 null,
   ID_PERSONA           Integer                 null,
   constraint PK_TBL_CLIENTES primary key (ID_CLIENTE)
);

/*==============================================================*/
/* Table: TBL_COMPRAS                                           */
/*==============================================================*/
create table TBL_COMPRAS (
   ID_COMPRA            SERIAL not null,
   ID_EMPRESA           Integer                 null,
   ID_ALMACEN           Integer                 null,
   ID_PROVEEDOR         Integer                 null,
   constraint PK_TBL_COMPRAS primary key (ID_COMPRA)
);

/*==============================================================*/
/* Table: TBL_DETALLE_COMPRA                                    */
/*==============================================================*/
create table TBL_DETALLE_COMPRA (
   ID_DETALLE_COMPRA    SERIAL               not null,
   ID_COMPRA            Integer                 null,
   ID_PRODUCTO          Integer                 null,
   CANTIDAD             Integer                 null,
   COSTO                CHAR(10)             null,
   constraint PK_TBL_DETALLE_COMPRA primary key (ID_DETALLE_COMPRA)
);

/*==============================================================*/
/* Table: TBL_DETALLE_VENTAS                                    */
/*==============================================================*/
create table TBL_DETALLE_VENTAS (
   ID_DETALLE_VENTA     SERIAL not null,
   ID_VENTA             Integer                 null,
   ID_PRODUCTO          Integer                 null,
   CANTIDAD             Integer                 null,
   PRECIO_UNITARIO      Numeric(7,2)              null,
   PRECIO_TOTAL         Numeric(7,2)              null,
   constraint PK_TBL_DETALLE_VENTAS primary key (ID_DETALLE_VENTA)
);

/*==============================================================*/
/* Table: TBL_EMPRESAS                                          */
/*==============================================================*/
create table TBL_EMPRESAS (
   ID_EMPRESA           SERIAL not null,
   ID_PERSONA           Integer                 null,
   RUC                  VARCHAR(13)          null,
   RAZON                VARCHAR(50)          null,
   SLOGAN               VARCHAR(50)          null,
   LOGO                 CHAR                 null,
   constraint PK_TBL_EMPRESAS primary key (ID_EMPRESA)
);

/*==============================================================*/
/* Table: TBL_MOSTRADORES                                       */
/*==============================================================*/
create table TBL_MOSTRADORES (
   ID_MOSTRADOR         SERIAL               not null,
   TBL_ID_MOSTRADOR     Integer                 null,
   DESCRIPCION          VARCHAR(200)         null,
   constraint PK_TBL_MOSTRADORES primary key (ID_MOSTRADOR)
);

/*==============================================================*/
/* Table: TBL_PERSONAS                                          */
/*==============================================================*/
create table TBL_PERSONAS (
   ID_PERSONA           SERIAL not null,
   CI_RUC               VARCHAR(13)          null,
   NOMBRES              VARCHAR(50)          null,
   APELLIDOS            VARCHAR(50)          null,
   TELEFONO             VARCHAR(10)          null,
   EMAIL                VARCHAR(50)          null,
   DIRECCION            VARCHAR(100)         null,
   constraint PK_TBL_PERSONAS primary key (ID_PERSONA)
);

/*==============================================================*/
/* Table: TBL_PRODUCTOS                                         */
/*==============================================================*/
create table TBL_PRODUCTOS (
   ID_PRODUCTO          SERIAL not null,
   ID_CATEGORIA         Integer                 null,
   ID_ALMACEN           Integer                 null,
   ID_TIPO              Integer                 null,
   ID_MOSTRADOR         Integer                 null,
   TIPO                 VARCHAR(10)          null,
   CODIGO               VARCHAR(50)          null,
   BARRAS               VARCHAR(50)          null,
   DESCRIPCION          VARCHAR(100)         null,
   COSTO                Numeric(7,2)              null,
   PRECIO_1             Numeric(7,2)              null,
   PRECIO_2             Numeric(7,2)              null,
   PRECIO_3             Numeric(7,2)              null,
   IVA                  Numeric(7,2)              null,
   STOCK                Integer                 null,
   constraint PK_TBL_PRODUCTOS primary key (ID_PRODUCTO)
);

/*==============================================================*/
/* Table: TBL_PROVEEDORES                                       */
/*==============================================================*/
create table TBL_PROVEEDORES (
   ID_PROVEEDOR         SERIAL               not null,
   ID_PERSONA           Integer                 null,
   ID_EMPRESA           Integer                 null,
   RAZON                VARCHAR(50)          null,
   constraint PK_TBL_PROVEEDORES primary key (ID_PROVEEDOR)
);

/*==============================================================*/
/* Table: TBL_ROLES                                             */
/*==============================================================*/
create table TBL_ROLES (
   ID_ROL               SERIAL not null,
   ROL                  VARCHAR(50)          null,
   constraint PK_TBL_ROLES primary key (ID_ROL)
);

/*==============================================================*/
/* Table: TBL_TIPO_PRODUCTOS                                    */
/*==============================================================*/
create table TBL_TIPO_PRODUCTOS (
   ID_TIPO              SERIAL               not null,
   DESCRIPCION          VARCHAR(200)         null,
   constraint PK_TBL_TIPO_PRODUCTOS primary key (ID_TIPO)
);

/*==============================================================*/
/* Table: TBL_USUARIOS                                          */
/*==============================================================*/
create table TBL_USUARIOS (
   ID_USUARIO           SERIAL not null,
   ID_PERSONA           Integer                 null,
   ID_ALMACEN           Integer                 null,
   ID_ROL               Integer                 null,
   USUARIO              VARCHAR(50)          null,
   PASSWORD             VARCHAR(100)         null,
   constraint PK_TBL_USUARIOS primary key (ID_USUARIO)
);

/*==============================================================*/
/* Table: TBL_VENTAS                                            */
/*==============================================================*/
create table TBL_VENTAS (
   ID_VENTA             SERIAL not null,
   ID_CLIENTE           Integer                 null,
   ID_USUARIO           Integer                 null,
   FECHA                DATE                 null,
   SERIE                Integer                 null,
   SECUENCIA            Integer                 null,
   SUBTOTAL             Numeric(7,2)              null,
   IVA                  Numeric(7,2)              null,
   TOTAL                Numeric(7,2)              null,
   constraint PK_TBL_VENTAS primary key (ID_VENTA)
);

alter table TBL_ALMACENES
   add constraint FK_TBL_ALMA_REFERENCE_TBL_EMPR foreign key (ID_EMPRESA)
      references TBL_EMPRESAS (ID_EMPRESA)
      on delete cascade on update cascade;

alter table TBL_CATEGORIAS
   add constraint FK_TBL_CATE_REFERENCE_TBL_CATE foreign key (TBL_ID_CATEGORIA)
      references TBL_CATEGORIAS (ID_CATEGORIA)
      on delete cascade on update cascade;

alter table TBL_CLIENTES
   add constraint FK_TBL_CLIE_REFERENCE_TBL_EMPR foreign key (ID_EMPRESA)
      references TBL_EMPRESAS (ID_EMPRESA)
      on delete cascade on update cascade;

alter table TBL_CLIENTES
   add constraint FK_TBL_CLIE_REFERENCE_TBL_PERS foreign key (ID_PERSONA)
      references TBL_PERSONAS (ID_PERSONA)
      on delete cascade on update cascade;

alter table TBL_COMPRAS
   add constraint FK_TBL_COMP_REFERENCE_TBL_EMPR foreign key (ID_EMPRESA)
      references TBL_EMPRESAS (ID_EMPRESA)
      on delete cascade on update cascade;

alter table TBL_COMPRAS
   add constraint FK_TBL_COMP_REFERENCE_TBL_ALMA foreign key (ID_ALMACEN)
      references TBL_ALMACENES (ID_ALMACEN)
      on delete cascade on update cascade;

alter table TBL_COMPRAS
   add constraint FK_TBL_COMP_REFERENCE_TBL_PROV foreign key (ID_PROVEEDOR)
      references TBL_PROVEEDORES (ID_PROVEEDOR)
      on delete cascade on update cascade;

alter table TBL_DETALLE_COMPRA
   add constraint FK_TBL_DETA_REFERENCE_TBL_COMP foreign key (ID_COMPRA)
      references TBL_COMPRAS (ID_COMPRA)
      on delete cascade on update cascade;

alter table TBL_DETALLE_COMPRA
   add constraint FK_TBL_DETA_REFERENCE_TBL_PROD foreign key (ID_PRODUCTO)
      references TBL_PRODUCTOS (ID_PRODUCTO)
      on delete cascade on update cascade;

alter table TBL_DETALLE_VENTAS
   add constraint FK_TBL_DETA_REFERENCE_TBL_VENT foreign key (ID_VENTA)
      references TBL_VENTAS (ID_VENTA)
      on delete cascade on update cascade;

alter table TBL_DETALLE_VENTAS
   add constraint FK_TBL_DETA_REFERENCE_TBL_PROD foreign key (ID_PRODUCTO)
      references TBL_PRODUCTOS (ID_PRODUCTO)
      on delete cascade on update cascade;

alter table TBL_EMPRESAS
   add constraint FK_TBL_EMPR_REFERENCE_TBL_PERS foreign key (ID_PERSONA)
      references TBL_PERSONAS (ID_PERSONA)
      on delete cascade on update cascade;

alter table TBL_MOSTRADORES
   add constraint FK_TBL_MOST_REFERENCE_TBL_MOST foreign key (TBL_ID_MOSTRADOR)
      references TBL_MOSTRADORES (ID_MOSTRADOR)
      on delete cascade on update cascade;

alter table TBL_PRODUCTOS
   add constraint FK_TBL_PROD_REFERENCE_TBL_TIPO foreign key (ID_TIPO)
      references TBL_TIPO_PRODUCTOS (ID_TIPO)
      on delete cascade on update cascade;

alter table TBL_PRODUCTOS
   add constraint FK_TBL_PROD_REFERENCE_TBL_MOST foreign key (ID_MOSTRADOR)
      references TBL_MOSTRADORES (ID_MOSTRADOR)
      on delete cascade on update cascade;

alter table TBL_PRODUCTOS
   add constraint FK_TBL_PROD_REFERENCE_TBL_CATE foreign key (ID_CATEGORIA)
      references TBL_CATEGORIAS (ID_CATEGORIA)
      on delete cascade on update cascade;

alter table TBL_PRODUCTOS
   add constraint FK_TBL_PROD_REFERENCE_TBL_ALMA foreign key (ID_ALMACEN)
      references TBL_ALMACENES (ID_ALMACEN)
      on delete cascade on update cascade;

alter table TBL_PROVEEDORES
   add constraint FK_TBL_PROV_REFERENCE_TBL_PERS foreign key (ID_PERSONA)
      references TBL_PERSONAS (ID_PERSONA)
      on delete cascade on update cascade;

alter table TBL_PROVEEDORES
   add constraint FK_TBL_PROV_REFERENCE_TBL_EMPR foreign key (ID_EMPRESA)
      references TBL_EMPRESAS (ID_EMPRESA)
      on delete cascade on update cascade;

alter table TBL_USUARIOS
   add constraint FK_TBL_USUA_REFERENCE_TBL_PERS foreign key (ID_PERSONA)
      references TBL_PERSONAS (ID_PERSONA)
      on delete cascade on update cascade;

alter table TBL_USUARIOS
   add constraint FK_TBL_USUA_REFERENCE_TBL_ROLE foreign key (ID_ROL)
      references TBL_ROLES (ID_ROL)
      on delete cascade on update cascade;

alter table TBL_USUARIOS
   add constraint FK_TBL_USUA_REFERENCE_TBL_ALMA foreign key (ID_ALMACEN)
      references TBL_ALMACENES (ID_ALMACEN)
      on delete cascade on update cascade;

alter table TBL_VENTAS
   add constraint FK_TBL_VENT_REFERENCE_TBL_CLIE foreign key (ID_CLIENTE)
      references TBL_CLIENTES (ID_CLIENTE)
      on delete cascade on update cascade;

alter table TBL_VENTAS
   add constraint FK_TBL_VENT_REFERENCE_TBL_USUA foreign key (ID_USUARIO)
      references TBL_USUARIOS (ID_USUARIO)
      on delete cascade on update cascade;

