import * as Apollo from '@apollo/client';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** A location in a connection that can be used for resuming pagination. */
    Cursor: any;
    /**
     * A point in time as described by the [ISO
     * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
     */
    Datetime: string;
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: {
        [key: string]: any;
    };
    /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
    UUID: any;
};
/** All user albums */
export declare type Album = Node & {
    __typename?: 'Album';
    /** Reads and enables pagination through a set of `_AlbumLightroomCollection`. */
    _albumLightroomCollections: _AlbumLightroomCollectionsConnection;
    /** Reads and enables pagination through a set of `AlbumMedia`. */
    albumMedias: AlbumMediaConnection;
    /** Content address of the album TODO */
    cid: Scalars['String'];
    createdAt: Scalars['Datetime'];
    /** Album description */
    description?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    /** Is album visible to other users */
    isPrivate: Scalars['Boolean'];
    /** If album is smart user can set specific rules on how to automatically add photos to it */
    isSmart: Scalars['Boolean'];
    /** Reads and enables pagination through a set of `LightroomCollection`. */
    lrCollections: AlbumLrCollectionsManyToManyConnection;
    /** Reads and enables pagination through a set of `Media`. */
    media: AlbumMediaManyToManyConnection;
    /** Album metadata */
    metadata: Scalars['JSON'];
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
    /** URL-friendly album slug */
    slug?: Maybe<Scalars['String']>;
    /** The smart album rules */
    smartRules: Scalars['JSON'];
    /** Album title */
    title?: Maybe<Scalars['String']>;
    updatedAt: Scalars['Datetime'];
};
/** All user albums */
export declare type Album_AlbumLightroomCollectionsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<_AlbumLightroomCollectionCondition>;
    filter?: Maybe<_AlbumLightroomCollectionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<_AlbumLightroomCollectionsOrderBy>>;
};
/** All user albums */
export declare type AlbumAlbumMediasArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<AlbumMediaCondition>;
    filter?: Maybe<AlbumMediaFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<AlbumMediaOrderBy>>;
};
/** All user albums */
export declare type AlbumLrCollectionsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCollectionCondition>;
    filter?: Maybe<LightroomCollectionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCollectionsOrderBy>>;
};
/** All user albums */
export declare type AlbumMediaArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<MediaCondition>;
    filter?: Maybe<MediaFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<MediaOrderBy>>;
};
/** A condition to be used against `Album` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export declare type AlbumCondition = {
    /** Checks for equality with the object’s `id` field. */
    id?: Maybe<Scalars['Int']>;
};
/** A filter to be used against `Album` object types. All fields are combined with a logical ‘and.’ */
export declare type AlbumFilter = {
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<AlbumFilter>>;
    /** Filter by the object’s `id` field. */
    id?: Maybe<IntFilter>;
    /** Negates the expression. */
    not?: Maybe<AlbumFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<AlbumFilter>>;
};
/** An input for mutations affecting `Album` */
export declare type AlbumInput = {
    /** Content address of the album TODO */
    cid: Scalars['String'];
    createdAt?: Maybe<Scalars['Datetime']>;
    /** Album description */
    description?: Maybe<Scalars['String']>;
    /** Is album visible to other users */
    isPrivate?: Maybe<Scalars['Boolean']>;
    /** If album is smart user can set specific rules on how to automatically add photos to it */
    isSmart?: Maybe<Scalars['Boolean']>;
    /** Album metadata */
    metadata?: Maybe<Scalars['JSON']>;
    /** URL-friendly album slug */
    slug?: Maybe<Scalars['String']>;
    /** The smart album rules */
    smartRules?: Maybe<Scalars['JSON']>;
    /** Album title */
    title?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['Datetime']>;
};
/** A connection to a list of `LightroomCollection` values, with data from `_AlbumLightroomCollection`. */
export declare type AlbumLrCollectionsManyToManyConnection = {
    __typename?: 'AlbumLrCollectionsManyToManyConnection';
    /** A list of edges which contains the `LightroomCollection`, info from the `_AlbumLightroomCollection`, and the cursor to aid in pagination. */
    edges: Array<AlbumLrCollectionsManyToManyEdge>;
    /** A list of `LightroomCollection` objects. */
    nodes: Array<LightroomCollection>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomCollection` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomCollection` edge in the connection, with data from `_AlbumLightroomCollection`. */
export declare type AlbumLrCollectionsManyToManyEdge = {
    __typename?: 'AlbumLrCollectionsManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `LightroomCollection` at the end of the edge. */
    node: LightroomCollection;
};
/** Mapping table between albums and media */
export declare type AlbumMedia = Node & {
    __typename?: 'AlbumMedia';
    /** Reads a single `Album` that is related to this `AlbumMedia`. */
    album?: Maybe<Album>;
    albumId: Scalars['Int'];
    /** Reads a single `Media` that is related to this `AlbumMedia`. */
    media?: Maybe<Media>;
    mediaId: Scalars['Int'];
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
};
/**
 * A condition to be used against `AlbumMedia` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export declare type AlbumMediaCondition = {
    /** Checks for equality with the object’s `albumId` field. */
    albumId?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `mediaId` field. */
    mediaId?: Maybe<Scalars['Int']>;
};
/** A connection to a list of `AlbumMedia` values. */
export declare type AlbumMediaConnection = {
    __typename?: 'AlbumMediaConnection';
    /** A list of edges which contains the `AlbumMedia` and cursor to aid in pagination. */
    edges: Array<AlbumMediaEdge>;
    /** A list of `AlbumMedia` objects. */
    nodes: Array<AlbumMedia>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `AlbumMedia` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `AlbumMedia` edge in the connection. */
export declare type AlbumMediaEdge = {
    __typename?: 'AlbumMediaEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `AlbumMedia` at the end of the edge. */
    node: AlbumMedia;
};
/** A filter to be used against `AlbumMedia` object types. All fields are combined with a logical ‘and.’ */
export declare type AlbumMediaFilter = {
    /** Filter by the object’s `albumId` field. */
    albumId?: Maybe<IntFilter>;
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<AlbumMediaFilter>>;
    /** Filter by the object’s `mediaId` field. */
    mediaId?: Maybe<IntFilter>;
    /** Negates the expression. */
    not?: Maybe<AlbumMediaFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<AlbumMediaFilter>>;
};
/** An input for mutations affecting `AlbumMedia` */
export declare type AlbumMediaInput = {
    albumId: Scalars['Int'];
    mediaId: Scalars['Int'];
};
/** A connection to a list of `Media` values, with data from `AlbumMedia`. */
export declare type AlbumMediaManyToManyConnection = {
    __typename?: 'AlbumMediaManyToManyConnection';
    /** A list of edges which contains the `Media`, info from the `AlbumMedia`, and the cursor to aid in pagination. */
    edges: Array<AlbumMediaManyToManyEdge>;
    /** A list of `Media` objects. */
    nodes: Array<Media>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `Media` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `Media` edge in the connection, with data from `AlbumMedia`. */
export declare type AlbumMediaManyToManyEdge = {
    __typename?: 'AlbumMediaManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `Media` at the end of the edge. */
    node: Media;
};
/** Methods to use when ordering `AlbumMedia`. */
export declare enum AlbumMediaOrderBy {
    AlbumIdAsc = "ALBUM_ID_ASC",
    AlbumIdDesc = "ALBUM_ID_DESC",
    MediaIdAsc = "MEDIA_ID_ASC",
    MediaIdDesc = "MEDIA_ID_DESC",
    Natural = "NATURAL",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Represents an update to a `AlbumMedia`. Fields that are set will be updated. */
export declare type AlbumMediaPatch = {
    albumId?: Maybe<Scalars['Int']>;
    mediaId?: Maybe<Scalars['Int']>;
};
/** Represents an update to a `Album`. Fields that are set will be updated. */
export declare type AlbumPatch = {
    /** Content address of the album TODO */
    cid?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['Datetime']>;
    /** Album description */
    description?: Maybe<Scalars['String']>;
    /** Is album visible to other users */
    isPrivate?: Maybe<Scalars['Boolean']>;
    /** If album is smart user can set specific rules on how to automatically add photos to it */
    isSmart?: Maybe<Scalars['Boolean']>;
    /** Album metadata */
    metadata?: Maybe<Scalars['JSON']>;
    /** URL-friendly album slug */
    slug?: Maybe<Scalars['String']>;
    /** The smart album rules */
    smartRules?: Maybe<Scalars['JSON']>;
    /** Album title */
    title?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['Datetime']>;
};
/** A connection to a list of `Album` values. */
export declare type AlbumsConnection = {
    __typename?: 'AlbumsConnection';
    /** A list of edges which contains the `Album` and cursor to aid in pagination. */
    edges: Array<AlbumsEdge>;
    /** A list of `Album` objects. */
    nodes: Array<Album>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `Album` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `Album` edge in the connection. */
export declare type AlbumsEdge = {
    __typename?: 'AlbumsEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `Album` at the end of the edge. */
    node: Album;
};
/** Methods to use when ordering `Album`. */
export declare enum AlbumsOrderBy {
    IdAsc = "ID_ASC",
    IdDesc = "ID_DESC",
    Natural = "NATURAL",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
export declare type AuthServiceInput = {
    details?: Maybe<Scalars['JSON']>;
    identifier?: Maybe<Scalars['String']>;
    service?: Maybe<Scalars['String']>;
};
/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export declare type BooleanFilter = {
    /** Not equal to the specified value, treating null like an ordinary value. */
    distinctFrom?: Maybe<Scalars['Boolean']>;
    /** Equal to the specified value. */
    equalTo?: Maybe<Scalars['Boolean']>;
    /** Greater than the specified value. */
    greaterThan?: Maybe<Scalars['Boolean']>;
    /** Greater than or equal to the specified value. */
    greaterThanOrEqualTo?: Maybe<Scalars['Boolean']>;
    /** Included in the specified list. */
    in?: Maybe<Array<Scalars['Boolean']>>;
    /** Is null (if `true` is specified) or is not null (if `false` is specified). */
    isNull?: Maybe<Scalars['Boolean']>;
    /** Less than the specified value. */
    lessThan?: Maybe<Scalars['Boolean']>;
    /** Less than or equal to the specified value. */
    lessThanOrEqualTo?: Maybe<Scalars['Boolean']>;
    /** Equal to the specified value, treating null like an ordinary value. */
    notDistinctFrom?: Maybe<Scalars['Boolean']>;
    /** Not equal to the specified value. */
    notEqualTo?: Maybe<Scalars['Boolean']>;
    /** Not included in the specified list. */
    notIn?: Maybe<Array<Scalars['Boolean']>>;
};
/** All copyright statements references to the media. Full statement info should be fetched from the network using either polkadot.js app, network interface or network js-api */
export declare type Copyright = Node & {
    __typename?: 'Copyright';
    id: Scalars['Int'];
    /** Reads a single `Media` that is related to this `Copyright`. */
    media?: Maybe<Media>;
    /** Internal Media <-> Ownership mapping */
    mediaId?: Maybe<Scalars['Int']>;
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
    /** URN based signer address urn:pgp:key-fingerprint */
    signer: Scalars['String'];
    /** Statement ID in its noraml form. To use this for fetching the data you need to HEX encode it and prefix it with 0x */
    statementId: Scalars['String'];
};
/**
 * A condition to be used against `Copyright` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export declare type CopyrightCondition = {
    /** Checks for equality with the object’s `id` field. */
    id?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `mediaId` field. */
    mediaId?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `statementId` field. */
    statementId?: Maybe<Scalars['String']>;
};
/** A filter to be used against `Copyright` object types. All fields are combined with a logical ‘and.’ */
export declare type CopyrightFilter = {
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<CopyrightFilter>>;
    /** Filter by the object’s `id` field. */
    id?: Maybe<IntFilter>;
    /** Filter by the object’s `mediaId` field. */
    mediaId?: Maybe<IntFilter>;
    /** Negates the expression. */
    not?: Maybe<CopyrightFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<CopyrightFilter>>;
    /** Filter by the object’s `statementId` field. */
    statementId?: Maybe<StringFilter>;
};
/** An input for mutations affecting `Copyright` */
export declare type CopyrightInput = {
    id?: Maybe<Scalars['Int']>;
    /** Internal Media <-> Ownership mapping */
    mediaId?: Maybe<Scalars['Int']>;
    /** URN based signer address urn:pgp:key-fingerprint */
    signer: Scalars['String'];
    /** Statement ID in its noraml form. To use this for fetching the data you need to HEX encode it and prefix it with 0x */
    statementId: Scalars['String'];
};
/** Represents an update to a `Copyright`. Fields that are set will be updated. */
export declare type CopyrightPatch = {
    id?: Maybe<Scalars['Int']>;
    /** Internal Media <-> Ownership mapping */
    mediaId?: Maybe<Scalars['Int']>;
    /** URN based signer address urn:pgp:key-fingerprint */
    signer?: Maybe<Scalars['String']>;
    /** Statement ID in its noraml form. To use this for fetching the data you need to HEX encode it and prefix it with 0x */
    statementId?: Maybe<Scalars['String']>;
};
/** A connection to a list of `Copyright` values. */
export declare type CopyrightsConnection = {
    __typename?: 'CopyrightsConnection';
    /** A list of edges which contains the `Copyright` and cursor to aid in pagination. */
    edges: Array<CopyrightsEdge>;
    /** A list of `Copyright` objects. */
    nodes: Array<Copyright>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `Copyright` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `Copyright` edge in the connection. */
export declare type CopyrightsEdge = {
    __typename?: 'CopyrightsEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `Copyright` at the end of the edge. */
    node: Copyright;
};
/** Methods to use when ordering `Copyright`. */
export declare enum CopyrightsOrderBy {
    IdAsc = "ID_ASC",
    IdDesc = "ID_DESC",
    MediaIdAsc = "MEDIA_ID_ASC",
    MediaIdDesc = "MEDIA_ID_DESC",
    Natural = "NATURAL",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC",
    StatementIdAsc = "STATEMENT_ID_ASC",
    StatementIdDesc = "STATEMENT_ID_DESC"
}
/** All input for the create `Album` mutation. */
export declare type CreateAlbumInput = {
    /** The `Album` to be created by this mutation. */
    album: AlbumInput;
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
};
/** All input for the create `AlbumMedia` mutation. */
export declare type CreateAlbumMediaInput = {
    /** The `AlbumMedia` to be created by this mutation. */
    albumMedia: AlbumMediaInput;
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
};
/** The output of our create `AlbumMedia` mutation. */
export declare type CreateAlbumMediaPayload = {
    __typename?: 'CreateAlbumMediaPayload';
    /** Reads a single `Album` that is related to this `AlbumMedia`. */
    album?: Maybe<Album>;
    /** The `AlbumMedia` that was created by this mutation. */
    albumMedia?: Maybe<AlbumMedia>;
    /** An edge for our `AlbumMedia`. May be used by Relay 1. */
    albumMediaEdge?: Maybe<AlbumMediaEdge>;
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Reads a single `Media` that is related to this `AlbumMedia`. */
    media?: Maybe<Media>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our create `AlbumMedia` mutation. */
export declare type CreateAlbumMediaPayloadAlbumMediaEdgeArgs = {
    orderBy?: Maybe<Array<AlbumMediaOrderBy>>;
};
/** The output of our create `Album` mutation. */
export declare type CreateAlbumPayload = {
    __typename?: 'CreateAlbumPayload';
    /** The `Album` that was created by this mutation. */
    album?: Maybe<Album>;
    /** An edge for our `Album`. May be used by Relay 1. */
    albumEdge?: Maybe<AlbumsEdge>;
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our create `Album` mutation. */
export declare type CreateAlbumPayloadAlbumEdgeArgs = {
    orderBy?: Maybe<Array<AlbumsOrderBy>>;
};
/** All input for the create `Copyright` mutation. */
export declare type CreateCopyrightInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The `Copyright` to be created by this mutation. */
    copyright: CopyrightInput;
};
/** The output of our create `Copyright` mutation. */
export declare type CreateCopyrightPayload = {
    __typename?: 'CreateCopyrightPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The `Copyright` that was created by this mutation. */
    copyright?: Maybe<Copyright>;
    /** An edge for our `Copyright`. May be used by Relay 1. */
    copyrightEdge?: Maybe<CopyrightsEdge>;
    /** Reads a single `Media` that is related to this `Copyright`. */
    media?: Maybe<Media>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our create `Copyright` mutation. */
export declare type CreateCopyrightPayloadCopyrightEdgeArgs = {
    orderBy?: Maybe<Array<CopyrightsOrderBy>>;
};
/** All input for the create `Device` mutation. */
export declare type CreateDeviceInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The `Device` to be created by this mutation. */
    device: DeviceInput;
};
/** The output of our create `Device` mutation. */
export declare type CreateDevicePayload = {
    __typename?: 'CreateDevicePayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The `Device` that was created by this mutation. */
    device?: Maybe<Device>;
    /** An edge for our `Device`. May be used by Relay 1. */
    deviceEdge?: Maybe<DevicesEdge>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our create `Device` mutation. */
export declare type CreateDevicePayloadDeviceEdgeArgs = {
    orderBy?: Maybe<Array<DevicesOrderBy>>;
};
/** All input for the create `Media` mutation. */
export declare type CreateMediaInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The `Media` to be created by this mutation. */
    media: MediaInput;
};
/** The output of our create `Media` mutation. */
export declare type CreateMediaPayload = {
    __typename?: 'CreateMediaPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Reads a single `Media` that is related to this `Media`. */
    masterMedia?: Maybe<Media>;
    /** The `Media` that was created by this mutation. */
    media?: Maybe<Media>;
    /** An edge for our `Media`. May be used by Relay 1. */
    mediaEdge?: Maybe<MediaEdge>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our create `Media` mutation. */
export declare type CreateMediaPayloadMediaEdgeArgs = {
    orderBy?: Maybe<Array<MediaOrderBy>>;
};
/** All input for the create `Rendition` mutation. */
export declare type CreateRenditionInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The `Rendition` to be created by this mutation. */
    rendition: RenditionInput;
};
/** The output of our create `Rendition` mutation. */
export declare type CreateRenditionPayload = {
    __typename?: 'CreateRenditionPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Reads a single `Media` that is related to this `Rendition`. */
    media?: Maybe<Media>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
    /** The `Rendition` that was created by this mutation. */
    rendition?: Maybe<Rendition>;
    /** An edge for our `Rendition`. May be used by Relay 1. */
    renditionEdge?: Maybe<RenditionsEdge>;
};
/** The output of our create `Rendition` mutation. */
export declare type CreateRenditionPayloadRenditionEdgeArgs = {
    orderBy?: Maybe<Array<RenditionsOrderBy>>;
};
/** All input for the create `UserEmail` mutation. */
export declare type CreateUserEmailInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The `UserEmail` to be created by this mutation. */
    userEmail: UserEmailInput;
};
/** The output of our create `UserEmail` mutation. */
export declare type CreateUserEmailPayload = {
    __typename?: 'CreateUserEmailPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
    /** Reads a single `User` that is related to this `UserEmail`. */
    user?: Maybe<User>;
    /** The `UserEmail` that was created by this mutation. */
    userEmail?: Maybe<UserEmail>;
    /** An edge for our `UserEmail`. May be used by Relay 1. */
    userEmailEdge?: Maybe<UserEmailsEdge>;
};
/** The output of our create `UserEmail` mutation. */
export declare type CreateUserEmailPayloadUserEmailEdgeArgs = {
    orderBy?: Maybe<Array<UserEmailsOrderBy>>;
};
/** Users crypto keys. This type is contextual for a incoming JWT. */
export declare type CryptoKey = Node & {
    __typename?: 'CryptoKey';
    algorithm?: Maybe<Scalars['String']>;
    /** content address identifier @anagolay/op-an-cid */
    cid: Scalars['String'];
    createdAt: Scalars['Datetime'];
    creationTime: Scalars['Datetime'];
    curve?: Maybe<Scalars['String']>;
    expirationTime?: Maybe<Scalars['Datetime']>;
    /**
     * unique key indentifier. more info -> https://tools.ietf.org/html/rfc4880#section-12.2
     * hex encoding
     */
    fingerprint: Scalars['String'];
    id: Scalars['Int'];
    /** options are p3skb, pgp */
    implementation: Scalars['String'];
    /** primary key to be used for the operations */
    isPrimary: Scalars['Boolean'];
    /**
     * A Key ID is an eight-octet scalar that identifies a key. more info -> https://tools.ietf.org/html/rfc4880#section-3.3
     * hex encoded
     */
    keyId: Scalars['String'];
    /** User firendly KEY name. Example: `My main key` */
    name?: Maybe<Scalars['String']>;
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
    /** Multibase encoded armored key */
    privateKey: Scalars['String'];
    /** Multibase encoded armored key */
    publicKey: Scalars['String'];
    /** Slug of the key name. */
    slug?: Maybe<Scalars['String']>;
    updatedAt: Scalars['Datetime'];
    /** Reads a single `User` that is related to this `CryptoKey`. */
    user?: Maybe<User>;
    userId: Scalars['Int'];
};
/**
 * A condition to be used against `CryptoKey` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export declare type CryptoKeyCondition = {
    /** Checks for equality with the object’s `cid` field. */
    cid?: Maybe<Scalars['String']>;
    /** Checks for equality with the object’s `fingerprint` field. */
    fingerprint?: Maybe<Scalars['String']>;
    /** Checks for equality with the object’s `id` field. */
    id?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `isPrimary` field. */
    isPrimary?: Maybe<Scalars['Boolean']>;
    /** Checks for equality with the object’s `userId` field. */
    userId?: Maybe<Scalars['Int']>;
};
/** A filter to be used against `CryptoKey` object types. All fields are combined with a logical ‘and.’ */
export declare type CryptoKeyFilter = {
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<CryptoKeyFilter>>;
    /** Filter by the object’s `cid` field. */
    cid?: Maybe<StringFilter>;
    /** Filter by the object’s `fingerprint` field. */
    fingerprint?: Maybe<StringFilter>;
    /** Filter by the object’s `id` field. */
    id?: Maybe<IntFilter>;
    /** Filter by the object’s `isPrimary` field. */
    isPrimary?: Maybe<BooleanFilter>;
    /** Negates the expression. */
    not?: Maybe<CryptoKeyFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<CryptoKeyFilter>>;
    /** Filter by the object’s `userId` field. */
    userId?: Maybe<IntFilter>;
};
/** Represents an update to a `CryptoKey`. Fields that are set will be updated. */
export declare type CryptoKeyPatch = {
    algorithm?: Maybe<Scalars['String']>;
    /** content address identifier @anagolay/op-an-cid */
    cid?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['Datetime']>;
    creationTime?: Maybe<Scalars['Datetime']>;
    curve?: Maybe<Scalars['String']>;
    expirationTime?: Maybe<Scalars['Datetime']>;
    /**
     * unique key indentifier. more info -> https://tools.ietf.org/html/rfc4880#section-12.2
     * hex encoding
     */
    fingerprint?: Maybe<Scalars['String']>;
    /** options are p3skb, pgp */
    implementation?: Maybe<Scalars['String']>;
    /** primary key to be used for the operations */
    isPrimary?: Maybe<Scalars['Boolean']>;
    /**
     * A Key ID is an eight-octet scalar that identifies a key. more info -> https://tools.ietf.org/html/rfc4880#section-3.3
     * hex encoded
     */
    keyId?: Maybe<Scalars['String']>;
    /** User firendly KEY name. Example: `My main key` */
    name?: Maybe<Scalars['String']>;
    /** Multibase encoded armored key */
    privateKey?: Maybe<Scalars['String']>;
    /** Multibase encoded armored key */
    publicKey?: Maybe<Scalars['String']>;
    /** Slug of the key name. */
    slug?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['Datetime']>;
    userId?: Maybe<Scalars['Int']>;
};
export declare type CryptoKeySimpleInput = {
    comment?: Maybe<Scalars['String']>;
    passphrase?: Maybe<Scalars['String']>;
};
/** A connection to a list of `CryptoKey` values. */
export declare type CryptoKeysConnection = {
    __typename?: 'CryptoKeysConnection';
    /** A list of edges which contains the `CryptoKey` and cursor to aid in pagination. */
    edges: Array<CryptoKeysEdge>;
    /** A list of `CryptoKey` objects. */
    nodes: Array<CryptoKey>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `CryptoKey` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `CryptoKey` edge in the connection. */
export declare type CryptoKeysEdge = {
    __typename?: 'CryptoKeysEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `CryptoKey` at the end of the edge. */
    node: CryptoKey;
};
/** Methods to use when ordering `CryptoKey`. */
export declare enum CryptoKeysOrderBy {
    CidAsc = "CID_ASC",
    CidDesc = "CID_DESC",
    FingerprintAsc = "FINGERPRINT_ASC",
    FingerprintDesc = "FINGERPRINT_DESC",
    IdAsc = "ID_ASC",
    IdDesc = "ID_DESC",
    IsPrimaryAsc = "IS_PRIMARY_ASC",
    IsPrimaryDesc = "IS_PRIMARY_DESC",
    Natural = "NATURAL",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC",
    UserIdAsc = "USER_ID_ASC",
    UserIdDesc = "USER_ID_DESC"
}
/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export declare type DatetimeFilter = {
    /** Not equal to the specified value, treating null like an ordinary value. */
    distinctFrom?: Maybe<Scalars['Datetime']>;
    /** Equal to the specified value. */
    equalTo?: Maybe<Scalars['Datetime']>;
    /** Greater than the specified value. */
    greaterThan?: Maybe<Scalars['Datetime']>;
    /** Greater than or equal to the specified value. */
    greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>;
    /** Included in the specified list. */
    in?: Maybe<Array<Scalars['Datetime']>>;
    /** Is null (if `true` is specified) or is not null (if `false` is specified). */
    isNull?: Maybe<Scalars['Boolean']>;
    /** Less than the specified value. */
    lessThan?: Maybe<Scalars['Datetime']>;
    /** Less than or equal to the specified value. */
    lessThanOrEqualTo?: Maybe<Scalars['Datetime']>;
    /** Equal to the specified value, treating null like an ordinary value. */
    notDistinctFrom?: Maybe<Scalars['Datetime']>;
    /** Not equal to the specified value. */
    notEqualTo?: Maybe<Scalars['Datetime']>;
    /** Not included in the specified list. */
    notIn?: Maybe<Array<Scalars['Datetime']>>;
};
/** All input for the `deleteAlbumByNodeId` mutation. */
export declare type DeleteAlbumByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `Album` to be deleted. */
    nodeId: Scalars['ID'];
};
/** All input for the `deleteAlbum` mutation. */
export declare type DeleteAlbumInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
};
/** All input for the `deleteAlbumMediaByNodeId` mutation. */
export declare type DeleteAlbumMediaByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `AlbumMedia` to be deleted. */
    nodeId: Scalars['ID'];
};
/** All input for the `deleteAlbumMedia` mutation. */
export declare type DeleteAlbumMediaInput = {
    albumId: Scalars['Int'];
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    mediaId: Scalars['Int'];
};
/** The output of our delete `AlbumMedia` mutation. */
export declare type DeleteAlbumMediaPayload = {
    __typename?: 'DeleteAlbumMediaPayload';
    /** Reads a single `Album` that is related to this `AlbumMedia`. */
    album?: Maybe<Album>;
    /** The `AlbumMedia` that was deleted by this mutation. */
    albumMedia?: Maybe<AlbumMedia>;
    /** An edge for our `AlbumMedia`. May be used by Relay 1. */
    albumMediaEdge?: Maybe<AlbumMediaEdge>;
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    deletedAlbumMediaNodeId?: Maybe<Scalars['ID']>;
    /** Reads a single `Media` that is related to this `AlbumMedia`. */
    media?: Maybe<Media>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our delete `AlbumMedia` mutation. */
export declare type DeleteAlbumMediaPayloadAlbumMediaEdgeArgs = {
    orderBy?: Maybe<Array<AlbumMediaOrderBy>>;
};
/** The output of our delete `Album` mutation. */
export declare type DeleteAlbumPayload = {
    __typename?: 'DeleteAlbumPayload';
    /** The `Album` that was deleted by this mutation. */
    album?: Maybe<Album>;
    /** An edge for our `Album`. May be used by Relay 1. */
    albumEdge?: Maybe<AlbumsEdge>;
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    deletedAlbumNodeId?: Maybe<Scalars['ID']>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our delete `Album` mutation. */
export declare type DeleteAlbumPayloadAlbumEdgeArgs = {
    orderBy?: Maybe<Array<AlbumsOrderBy>>;
};
/** All input for the `deleteCopyrightByNodeId` mutation. */
export declare type DeleteCopyrightByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `Copyright` to be deleted. */
    nodeId: Scalars['ID'];
};
/** All input for the `deleteCopyright` mutation. */
export declare type DeleteCopyrightInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
};
/** The output of our delete `Copyright` mutation. */
export declare type DeleteCopyrightPayload = {
    __typename?: 'DeleteCopyrightPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The `Copyright` that was deleted by this mutation. */
    copyright?: Maybe<Copyright>;
    /** An edge for our `Copyright`. May be used by Relay 1. */
    copyrightEdge?: Maybe<CopyrightsEdge>;
    deletedCopyrightNodeId?: Maybe<Scalars['ID']>;
    /** Reads a single `Media` that is related to this `Copyright`. */
    media?: Maybe<Media>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our delete `Copyright` mutation. */
export declare type DeleteCopyrightPayloadCopyrightEdgeArgs = {
    orderBy?: Maybe<Array<CopyrightsOrderBy>>;
};
/** All input for the `deleteDeviceByCid` mutation. */
export declare type DeleteDeviceByCidInput = {
    /** Content identifier of the device identifiers. Using `@anagolay/op-an-cid(identifiers)`. */
    cid: Scalars['String'];
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
};
/** All input for the `deleteDeviceByNodeId` mutation. */
export declare type DeleteDeviceByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `Device` to be deleted. */
    nodeId: Scalars['ID'];
};
/** All input for the `deleteDevice` mutation. */
export declare type DeleteDeviceInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
};
/** The output of our delete `Device` mutation. */
export declare type DeleteDevicePayload = {
    __typename?: 'DeleteDevicePayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    deletedDeviceNodeId?: Maybe<Scalars['ID']>;
    /** The `Device` that was deleted by this mutation. */
    device?: Maybe<Device>;
    /** An edge for our `Device`. May be used by Relay 1. */
    deviceEdge?: Maybe<DevicesEdge>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our delete `Device` mutation. */
export declare type DeleteDevicePayloadDeviceEdgeArgs = {
    orderBy?: Maybe<Array<DevicesOrderBy>>;
};
/** All input for the `deleteMediaByNodeId` mutation. */
export declare type DeleteMediaByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `Media` to be deleted. */
    nodeId: Scalars['ID'];
};
/** All input for the `deleteMediaDeviceByMediaIdAndDeviceId` mutation. */
export declare type DeleteMediaDeviceByMediaIdAndDeviceIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    deviceId: Scalars['Int'];
    mediaId: Scalars['Int'];
};
/** The output of our delete `MediaDevice` mutation. */
export declare type DeleteMediaDevicePayload = {
    __typename?: 'DeleteMediaDevicePayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    deletedMediaDeviceNodeId?: Maybe<Scalars['ID']>;
    /** Reads a single `Device` that is related to this `MediaDevice`. */
    device?: Maybe<Device>;
    /** Reads a single `Media` that is related to this `MediaDevice`. */
    media?: Maybe<Media>;
    /** The `MediaDevice` that was deleted by this mutation. */
    mediaDevice?: Maybe<MediaDevice>;
    /** An edge for our `MediaDevice`. May be used by Relay 1. */
    mediaDeviceEdge?: Maybe<MediaDevicesEdge>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our delete `MediaDevice` mutation. */
export declare type DeleteMediaDevicePayloadMediaDeviceEdgeArgs = {
    orderBy?: Maybe<Array<MediaDevicesOrderBy>>;
};
/** All input for the `deleteMedia` mutation. */
export declare type DeleteMediaInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
};
/** The output of our delete `Media` mutation. */
export declare type DeleteMediaPayload = {
    __typename?: 'DeleteMediaPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    deletedMediaNodeId?: Maybe<Scalars['ID']>;
    /** Reads a single `Media` that is related to this `Media`. */
    masterMedia?: Maybe<Media>;
    /** The `Media` that was deleted by this mutation. */
    media?: Maybe<Media>;
    /** An edge for our `Media`. May be used by Relay 1. */
    mediaEdge?: Maybe<MediaEdge>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our delete `Media` mutation. */
export declare type DeleteMediaPayloadMediaEdgeArgs = {
    orderBy?: Maybe<Array<MediaOrderBy>>;
};
/** All input for the `deleteRenditionByCid` mutation. */
export declare type DeleteRenditionByCidInput = {
    /** content address identifier @anagolay/op-an-cid npm package */
    cid: Scalars['String'];
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
};
/** All input for the `deleteRenditionByMediaIdAndIsMaster` mutation. */
export declare type DeleteRenditionByMediaIdAndIsMasterInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Every Media must hava one master rendition. Usually First one is the master. This one is served by default when viewing in the apps. */
    isMaster: Scalars['Boolean'];
    mediaId: Scalars['Int'];
};
/** All input for the `deleteRenditionByNodeId` mutation. */
export declare type DeleteRenditionByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `Rendition` to be deleted. */
    nodeId: Scalars['ID'];
};
/** All input for the `deleteRendition` mutation. */
export declare type DeleteRenditionInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
};
/** The output of our delete `Rendition` mutation. */
export declare type DeleteRenditionPayload = {
    __typename?: 'DeleteRenditionPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    deletedRenditionNodeId?: Maybe<Scalars['ID']>;
    /** Reads a single `Media` that is related to this `Rendition`. */
    media?: Maybe<Media>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
    /** The `Rendition` that was deleted by this mutation. */
    rendition?: Maybe<Rendition>;
    /** An edge for our `Rendition`. May be used by Relay 1. */
    renditionEdge?: Maybe<RenditionsEdge>;
};
/** The output of our delete `Rendition` mutation. */
export declare type DeleteRenditionPayloadRenditionEdgeArgs = {
    orderBy?: Maybe<Array<RenditionsOrderBy>>;
};
/** All input for the `deleteUserAuthenticationByNodeId` mutation. */
export declare type DeleteUserAuthenticationByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `UserAuthentication` to be deleted. */
    nodeId: Scalars['ID'];
};
/** All input for the `deleteUserAuthenticationByServiceAndIdentifier` mutation. */
export declare type DeleteUserAuthenticationByServiceAndIdentifierInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** A unique identifier for the user within the login service. */
    identifier: Scalars['String'];
    /** The login service used, e.g. `google`,`auth0` */
    service: Scalars['String'];
};
/** All input for the `deleteUserAuthentication` mutation. */
export declare type DeleteUserAuthenticationInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
};
/** The output of our delete `UserAuthentication` mutation. */
export declare type DeleteUserAuthenticationPayload = {
    __typename?: 'DeleteUserAuthenticationPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    deletedUserAuthenticationNodeId?: Maybe<Scalars['ID']>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
    /** The `UserAuthentication` that was deleted by this mutation. */
    userAuthentication?: Maybe<UserAuthentication>;
    /** An edge for our `UserAuthentication`. May be used by Relay 1. */
    userAuthenticationEdge?: Maybe<UserAuthenticationsEdge>;
};
/** The output of our delete `UserAuthentication` mutation. */
export declare type DeleteUserAuthenticationPayloadUserAuthenticationEdgeArgs = {
    orderBy?: Maybe<Array<UserAuthenticationsOrderBy>>;
};
/** All input for the `deleteUserByNodeId` mutation. */
export declare type DeleteUserByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `User` to be deleted. */
    nodeId: Scalars['ID'];
};
/** All input for the `deleteUserByUsername` mutation. */
export declare type DeleteUserByUsernameInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Public-facing username (or 'handle') of the user. */
    username: Scalars['String'];
};
/** All input for the `deleteUserEmailByNodeId` mutation. */
export declare type DeleteUserEmailByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `UserEmail` to be deleted. */
    nodeId: Scalars['ID'];
};
/** All input for the `deleteUserEmailByUserIdAndEmail` mutation. */
export declare type DeleteUserEmailByUserIdAndEmailInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The users email address, in `a@b.c` format. */
    email: Scalars['String'];
    userId: Scalars['Int'];
};
/** All input for the `deleteUserEmail` mutation. */
export declare type DeleteUserEmailInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
};
/** The output of our delete `UserEmail` mutation. */
export declare type DeleteUserEmailPayload = {
    __typename?: 'DeleteUserEmailPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    deletedUserEmailNodeId?: Maybe<Scalars['ID']>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
    /** Reads a single `User` that is related to this `UserEmail`. */
    user?: Maybe<User>;
    /** The `UserEmail` that was deleted by this mutation. */
    userEmail?: Maybe<UserEmail>;
    /** An edge for our `UserEmail`. May be used by Relay 1. */
    userEmailEdge?: Maybe<UserEmailsEdge>;
};
/** The output of our delete `UserEmail` mutation. */
export declare type DeleteUserEmailPayloadUserEmailEdgeArgs = {
    orderBy?: Maybe<Array<UserEmailsOrderBy>>;
};
/** All input for the `deleteUser` mutation. */
export declare type DeleteUserInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
};
/** The output of our delete `User` mutation. */
export declare type DeleteUserPayload = {
    __typename?: 'DeleteUserPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    deletedUserNodeId?: Maybe<Scalars['ID']>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
    /** The `User` that was deleted by this mutation. */
    user?: Maybe<User>;
    /** An edge for our `User`. May be used by Relay 1. */
    userEdge?: Maybe<UsersEdge>;
};
/** The output of our delete `User` mutation. */
export declare type DeleteUserPayloadUserEdgeArgs = {
    orderBy?: Maybe<Array<UsersOrderBy>>;
};
/** The photo gear, camera, lenses, phones.... */
export declare type Device = Node & {
    __typename?: 'Device';
    /** Content identifier of the device identifiers. Using `@anagolay/op-an-cid(identifiers)`. */
    cid: Scalars['String'];
    createdAt: Scalars['Datetime'];
    /** Choose one of the custom device types. */
    deviceType: Devicetype;
    id: Scalars['Int'];
    /** Unique  identifiers for the device. In case of the lens, it is the `[xmp.LensID,xmp.LensSerialNumber]`. */
    identifiers?: Maybe<Scalars['JSON']>;
    /** Who made the device. Example `Canon`. */
    maker?: Maybe<Scalars['String']>;
    /** Reads and enables pagination through a set of `MediaDevice`. */
    mediaDevices: MediaDevicesConnection;
    /** Reads and enables pagination through a set of `Media`. */
    mediaList: DeviceMediaListManyToManyConnection;
    /** What is the model of the device. Example `Canon EOS 700D`. */
    model?: Maybe<Scalars['String']>;
    /** Custom device name. Default is `My device.model`. */
    name?: Maybe<Scalars['String']>;
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
    /** Information on the ownership from the Anagolay Network. */
    ownership?: Maybe<Array<Maybe<SnProof>>>;
    /** When the PoCLO has been executed and ownership created. */
    ownershipCreatedAt: Scalars['Datetime'];
    /** Anagolay Network PoCLO rule is executed and ownership is verified. */
    ownershipVerified: Scalars['Boolean'];
    /** Anagolay Network  Proof of Existence ID */
    poeId?: Maybe<Scalars['String']>;
    updatedAt: Scalars['Datetime'];
};
/** The photo gear, camera, lenses, phones.... */
export declare type DeviceMediaDevicesArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<MediaDeviceCondition>;
    filter?: Maybe<MediaDeviceFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<MediaDevicesOrderBy>>;
};
/** The photo gear, camera, lenses, phones.... */
export declare type DeviceMediaListArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<MediaCondition>;
    filter?: Maybe<MediaFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<MediaOrderBy>>;
};
/** A condition to be used against `Device` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export declare type DeviceCondition = {
    /** Checks for equality with the object’s `cid` field. */
    cid?: Maybe<Scalars['String']>;
    /** Checks for equality with the object’s `id` field. */
    id?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `poeId` field. */
    poeId?: Maybe<Scalars['String']>;
};
/** A filter to be used against `Device` object types. All fields are combined with a logical ‘and.’ */
export declare type DeviceFilter = {
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<DeviceFilter>>;
    /** Filter by the object’s `cid` field. */
    cid?: Maybe<StringFilter>;
    /** Filter by the object’s `id` field. */
    id?: Maybe<IntFilter>;
    /** Negates the expression. */
    not?: Maybe<DeviceFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<DeviceFilter>>;
    /** Filter by the object’s `poeId` field. */
    poeId?: Maybe<StringFilter>;
};
/** An input for mutations affecting `Device` */
export declare type DeviceInput = {
    /** Content identifier of the device identifiers. Using `@anagolay/op-an-cid(identifiers)`. */
    cid: Scalars['String'];
    /** Choose one of the custom device types. */
    deviceType: Devicetype;
    /** Unique  identifiers for the device. In case of the lens, it is the `[xmp.LensID,xmp.LensSerialNumber]`. */
    identifiers?: Maybe<Scalars['JSON']>;
    /** Who made the device. Example `Canon`. */
    maker?: Maybe<Scalars['String']>;
    /** What is the model of the device. Example `Canon EOS 700D`. */
    model?: Maybe<Scalars['String']>;
    /** Custom device name. Default is `My device.model`. */
    name?: Maybe<Scalars['String']>;
    /** Information on the ownership from the Anagolay Network. */
    ownership?: Maybe<Array<Maybe<SnProofInput>>>;
    /** Anagolay Network PoCLO rule is executed and ownership is verified. */
    ownershipVerified?: Maybe<Scalars['Boolean']>;
    /** Anagolay Network  Proof of Existence ID */
    poeId?: Maybe<Scalars['String']>;
};
/** A connection to a list of `Media` values, with data from `MediaDevice`. */
export declare type DeviceMediaListManyToManyConnection = {
    __typename?: 'DeviceMediaListManyToManyConnection';
    /** A list of edges which contains the `Media`, info from the `MediaDevice`, and the cursor to aid in pagination. */
    edges: Array<DeviceMediaListManyToManyEdge>;
    /** A list of `Media` objects. */
    nodes: Array<Media>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `Media` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `Media` edge in the connection, with data from `MediaDevice`. */
export declare type DeviceMediaListManyToManyEdge = {
    __typename?: 'DeviceMediaListManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `Media` at the end of the edge. */
    node: Media;
};
/** Represents an update to a `Device`. Fields that are set will be updated. */
export declare type DevicePatch = {
    /** Content identifier of the device identifiers. Using `@anagolay/op-an-cid(identifiers)`. */
    cid?: Maybe<Scalars['String']>;
    /** Choose one of the custom device types. */
    deviceType?: Maybe<Devicetype>;
    /** Unique  identifiers for the device. In case of the lens, it is the `[xmp.LensID,xmp.LensSerialNumber]`. */
    identifiers?: Maybe<Scalars['JSON']>;
    /** Who made the device. Example `Canon`. */
    maker?: Maybe<Scalars['String']>;
    /** What is the model of the device. Example `Canon EOS 700D`. */
    model?: Maybe<Scalars['String']>;
    /** Custom device name. Default is `My device.model`. */
    name?: Maybe<Scalars['String']>;
    /** Information on the ownership from the Anagolay Network. */
    ownership?: Maybe<Array<Maybe<SnProofInput>>>;
    /** When the PoCLO has been executed and ownership created. */
    ownershipCreatedAt?: Maybe<Scalars['Datetime']>;
    /** Anagolay Network PoCLO rule is executed and ownership is verified. */
    ownershipVerified?: Maybe<Scalars['Boolean']>;
    /** Anagolay Network  Proof of Existence ID */
    poeId?: Maybe<Scalars['String']>;
};
/** A connection to a list of `Device` values. */
export declare type DevicesConnection = {
    __typename?: 'DevicesConnection';
    /** A list of edges which contains the `Device` and cursor to aid in pagination. */
    edges: Array<DevicesEdge>;
    /** A list of `Device` objects. */
    nodes: Array<Device>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `Device` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `Device` edge in the connection. */
export declare type DevicesEdge = {
    __typename?: 'DevicesEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `Device` at the end of the edge. */
    node: Device;
};
/** Methods to use when ordering `Device`. */
export declare enum DevicesOrderBy {
    CidAsc = "CID_ASC",
    CidDesc = "CID_DESC",
    IdAsc = "ID_ASC",
    IdDesc = "ID_DESC",
    Natural = "NATURAL",
    PoeIdAsc = "POE_ID_ASC",
    PoeIdDesc = "POE_ID_DESC",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Physical device that is used to the ownership statement creation. */
export declare enum Devicetype {
    Camera = "CAMERA",
    Laptop = "LAPTOP",
    Lens = "LENS",
    Smartphone = "SMARTPHONE"
}
export declare type GpsInputPayload = {
    latitude: Scalars['Float'];
    longitude: Scalars['Float'];
};
/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export declare type IntFilter = {
    /** Not equal to the specified value, treating null like an ordinary value. */
    distinctFrom?: Maybe<Scalars['Int']>;
    /** Equal to the specified value. */
    equalTo?: Maybe<Scalars['Int']>;
    /** Greater than the specified value. */
    greaterThan?: Maybe<Scalars['Int']>;
    /** Greater than or equal to the specified value. */
    greaterThanOrEqualTo?: Maybe<Scalars['Int']>;
    /** Included in the specified list. */
    in?: Maybe<Array<Scalars['Int']>>;
    /** Is null (if `true` is specified) or is not null (if `false` is specified). */
    isNull?: Maybe<Scalars['Boolean']>;
    /** Less than the specified value. */
    lessThan?: Maybe<Scalars['Int']>;
    /** Less than or equal to the specified value. */
    lessThanOrEqualTo?: Maybe<Scalars['Int']>;
    /** Equal to the specified value, treating null like an ordinary value. */
    notDistinctFrom?: Maybe<Scalars['Int']>;
    /** Not equal to the specified value. */
    notEqualTo?: Maybe<Scalars['Int']>;
    /** Not included in the specified list. */
    notIn?: Maybe<Array<Scalars['Int']>>;
};
/** Lightroom Catalog table contains the general info on the synced catalog for the purposes of syncing back to the LR. */
export declare type LightroomCatalog = Node & {
    __typename?: 'LightroomCatalog';
    /** Reads and enables pagination through a set of `LightroomCollection`. */
    collectionList: LightroomCatalogCollectionListManyToManyConnection;
    /** Information on the collections with their internal IDs */
    collections: Scalars['JSON'];
    /** Information on the collection sets with their internal IDs */
    collectionSets: Scalars['JSON'];
    /** When the record is created */
    createdAt: Scalars['Datetime'];
    id: Scalars['Int'];
    /** Reads and enables pagination through a set of `LightroomCollection`. */
    lightroomCollectionsByCatalogId: LightroomCollectionsConnection;
    /** Reads and enables pagination through a set of `LightroomCollection`. */
    lightroomCollectionsByLightroomCollectionCatalogIdAndParentId: LightroomCatalogLightroomCollectionsByLightroomCollectionCatalogIdAndParentIdManyToManyConnection;
    /** Reads and enables pagination through a set of `LightroomMedia`. */
    lightroomMediaByLightroomMediaUniquenessCatalogIdAndLrMedia: LightroomCatalogLightroomMediaByLightroomMediaUniquenessCatalogIdAndLrMediaManyToManyConnection;
    /** Reads and enables pagination through a set of `LightroomMediaUniqueness`. */
    lightroomMediaUniquenessesByCatalogId: LightroomMediaUniquenessesConnection;
    /** Catalog name */
    name?: Maybe<Scalars['String']>;
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
    slug?: Maybe<Scalars['String']>;
    /** When the record is updated */
    updatedAt: Scalars['Datetime'];
};
/** Lightroom Catalog table contains the general info on the synced catalog for the purposes of syncing back to the LR. */
export declare type LightroomCatalogCollectionListArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCollectionCondition>;
    filter?: Maybe<LightroomCollectionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCollectionsOrderBy>>;
};
/** Lightroom Catalog table contains the general info on the synced catalog for the purposes of syncing back to the LR. */
export declare type LightroomCatalogLightroomCollectionsByCatalogIdArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCollectionCondition>;
    filter?: Maybe<LightroomCollectionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCollectionsOrderBy>>;
};
/** Lightroom Catalog table contains the general info on the synced catalog for the purposes of syncing back to the LR. */
export declare type LightroomCatalogLightroomCollectionsByLightroomCollectionCatalogIdAndParentIdArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCollectionCondition>;
    filter?: Maybe<LightroomCollectionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCollectionsOrderBy>>;
};
/** Lightroom Catalog table contains the general info on the synced catalog for the purposes of syncing back to the LR. */
export declare type LightroomCatalogLightroomMediaByLightroomMediaUniquenessCatalogIdAndLrMediaArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaCondition>;
    filter?: Maybe<LightroomMediaFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaOrderBy>>;
};
/** Lightroom Catalog table contains the general info on the synced catalog for the purposes of syncing back to the LR. */
export declare type LightroomCatalogLightroomMediaUniquenessesByCatalogIdArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaUniquenessCondition>;
    filter?: Maybe<LightroomMediaUniquenessFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaUniquenessesOrderBy>>;
};
/** A connection to a list of `LightroomCollection` values, with data from `LightroomMediaUniqueness`. */
export declare type LightroomCatalogCollectionListManyToManyConnection = {
    __typename?: 'LightroomCatalogCollectionListManyToManyConnection';
    /** A list of edges which contains the `LightroomCollection`, info from the `LightroomMediaUniqueness`, and the cursor to aid in pagination. */
    edges: Array<LightroomCatalogCollectionListManyToManyEdge>;
    /** A list of `LightroomCollection` objects. */
    nodes: Array<LightroomCollection>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomCollection` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomCollection` edge in the connection, with data from `LightroomMediaUniqueness`. */
export declare type LightroomCatalogCollectionListManyToManyEdge = {
    __typename?: 'LightroomCatalogCollectionListManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** Reads and enables pagination through a set of `LightroomMediaUniqueness`. */
    lightroomMediaUniquenessesByCollectionId: LightroomMediaUniquenessesConnection;
    /** The `LightroomCollection` at the end of the edge. */
    node: LightroomCollection;
};
/** A `LightroomCollection` edge in the connection, with data from `LightroomMediaUniqueness`. */
export declare type LightroomCatalogCollectionListManyToManyEdgeLightroomMediaUniquenessesByCollectionIdArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaUniquenessCondition>;
    filter?: Maybe<LightroomMediaUniquenessFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaUniquenessesOrderBy>>;
};
/**
 * A condition to be used against `LightroomCatalog` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export declare type LightroomCatalogCondition = {
    /** Checks for equality with the object’s `id` field. */
    id?: Maybe<Scalars['Int']>;
};
/** A filter to be used against `LightroomCatalog` object types. All fields are combined with a logical ‘and.’ */
export declare type LightroomCatalogFilter = {
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<LightroomCatalogFilter>>;
    /** Filter by the object’s `id` field. */
    id?: Maybe<IntFilter>;
    /** Negates the expression. */
    not?: Maybe<LightroomCatalogFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<LightroomCatalogFilter>>;
};
/** A connection to a list of `LightroomCollection` values, with data from `LightroomCollection`. */
export declare type LightroomCatalogLightroomCollectionsByLightroomCollectionCatalogIdAndParentIdManyToManyConnection = {
    __typename?: 'LightroomCatalogLightroomCollectionsByLightroomCollectionCatalogIdAndParentIdManyToManyConnection';
    /** A list of edges which contains the `LightroomCollection`, info from the `LightroomCollection`, and the cursor to aid in pagination. */
    edges: Array<LightroomCatalogLightroomCollectionsByLightroomCollectionCatalogIdAndParentIdManyToManyEdge>;
    /** A list of `LightroomCollection` objects. */
    nodes: Array<LightroomCollection>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomCollection` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomCollection` edge in the connection, with data from `LightroomCollection`. */
export declare type LightroomCatalogLightroomCollectionsByLightroomCollectionCatalogIdAndParentIdManyToManyEdge = {
    __typename?: 'LightroomCatalogLightroomCollectionsByLightroomCollectionCatalogIdAndParentIdManyToManyEdge';
    /** Reads and enables pagination through a set of `LightroomCollection`. */
    childLightroomCollections: LightroomCollectionsConnection;
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `LightroomCollection` at the end of the edge. */
    node: LightroomCollection;
};
/** A `LightroomCollection` edge in the connection, with data from `LightroomCollection`. */
export declare type LightroomCatalogLightroomCollectionsByLightroomCollectionCatalogIdAndParentIdManyToManyEdgeChildLightroomCollectionsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCollectionCondition>;
    filter?: Maybe<LightroomCollectionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCollectionsOrderBy>>;
};
/** A connection to a list of `LightroomMedia` values, with data from `LightroomMediaUniqueness`. */
export declare type LightroomCatalogLightroomMediaByLightroomMediaUniquenessCatalogIdAndLrMediaManyToManyConnection = {
    __typename?: 'LightroomCatalogLightroomMediaByLightroomMediaUniquenessCatalogIdAndLrMediaManyToManyConnection';
    /** A list of edges which contains the `LightroomMedia`, info from the `LightroomMediaUniqueness`, and the cursor to aid in pagination. */
    edges: Array<LightroomCatalogLightroomMediaByLightroomMediaUniquenessCatalogIdAndLrMediaManyToManyEdge>;
    /** A list of `LightroomMedia` objects. */
    nodes: Array<LightroomMedia>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomMedia` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomMedia` edge in the connection, with data from `LightroomMediaUniqueness`. */
export declare type LightroomCatalogLightroomMediaByLightroomMediaUniquenessCatalogIdAndLrMediaManyToManyEdge = {
    __typename?: 'LightroomCatalogLightroomMediaByLightroomMediaUniquenessCatalogIdAndLrMediaManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** Reads and enables pagination through a set of `LightroomMediaUniqueness`. */
    lightroomMediaUniquenessesByLrMedia: LightroomMediaUniquenessesConnection;
    /** The `LightroomMedia` at the end of the edge. */
    node: LightroomMedia;
};
/** A `LightroomMedia` edge in the connection, with data from `LightroomMediaUniqueness`. */
export declare type LightroomCatalogLightroomMediaByLightroomMediaUniquenessCatalogIdAndLrMediaManyToManyEdgeLightroomMediaUniquenessesByLrMediaArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaUniquenessCondition>;
    filter?: Maybe<LightroomMediaUniquenessFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaUniquenessesOrderBy>>;
};
/** A connection to a list of `LightroomCatalog` values. */
export declare type LightroomCatalogsConnection = {
    __typename?: 'LightroomCatalogsConnection';
    /** A list of edges which contains the `LightroomCatalog` and cursor to aid in pagination. */
    edges: Array<LightroomCatalogsEdge>;
    /** A list of `LightroomCatalog` objects. */
    nodes: Array<LightroomCatalog>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomCatalog` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomCatalog` edge in the connection. */
export declare type LightroomCatalogsEdge = {
    __typename?: 'LightroomCatalogsEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `LightroomCatalog` at the end of the edge. */
    node: LightroomCatalog;
};
/** Methods to use when ordering `LightroomCatalog`. */
export declare enum LightroomCatalogsOrderBy {
    IdAsc = "ID_ASC",
    IdDesc = "ID_DESC",
    Natural = "NATURAL",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Lightroom Collection or Collection Set. This will be connected to an Album and the Lightroom Catalog. */
export declare type LightroomCollection = Node & {
    __typename?: 'LightroomCollection';
    /** Reads and enables pagination through a set of `_AlbumLightroomCollection`. */
    _albumLightroomCollectionsByCollectionId: _AlbumLightroomCollectionsConnection;
    /** Reads and enables pagination through a set of `Album`. */
    albumList: LightroomCollectionAlbumListManyToManyConnection;
    /** Reads a single `LightroomCatalog` that is related to this `LightroomCollection`. */
    catalog?: Maybe<LightroomCatalog>;
    /** Lightroom Catalog connection. */
    catalogId: Scalars['Int'];
    /** Reads and enables pagination through a set of `LightroomCatalog`. */
    catalogList: LightroomCollectionCatalogListManyToManyConnection;
    /** Reads and enables pagination through a set of `LightroomCollection`. */
    childLightroomCollections: LightroomCollectionsConnection;
    createdAt: Scalars['Datetime'];
    id: Scalars['Int'];
    /** Indicates is the collection a `smart collection`. Smart collections have search description to filter out the photos. */
    isSmart: Scalars['Boolean'];
    /** Reads and enables pagination through a set of `LightroomCatalog`. */
    lightroomCatalogsByLightroomCollectionParentIdAndCatalogId: LightroomCollectionLightroomCatalogsByLightroomCollectionParentIdAndCatalogIdManyToManyConnection;
    /** Reads and enables pagination through a set of `LightroomMedia`. */
    lightroomMediaByLightroomMediaUniquenessCollectionIdAndLrMedia: LightroomCollectionLightroomMediaByLightroomMediaUniquenessCollectionIdAndLrMediaManyToManyConnection;
    /** Reads and enables pagination through a set of `LightroomMediaUniqueness`. */
    lightroomMediaUniquenessesByCollectionId: LightroomMediaUniquenessesConnection;
    /** The local identifier of the published collection, unique within the Lighroom catalog. */
    localIdentifier: Scalars['Int'];
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
    /** Reads a single `LightroomCollection` that is related to this `LightroomCollection`. */
    parentCollection?: Maybe<LightroomCollection>;
    /** If the collection is in the collection set then this will be the parent collection. */
    parentId?: Maybe<Scalars['Int']>;
    /** Lightroom specific search description in case this is smart collection. */
    searchDescription: Scalars['JSON'];
    /** Autogenerated title slug. */
    slug?: Maybe<Scalars['String']>;
    /** Collection title. */
    title?: Maybe<Scalars['String']>;
    updatedAt: Scalars['Datetime'];
};
/** Lightroom Collection or Collection Set. This will be connected to an Album and the Lightroom Catalog. */
export declare type LightroomCollection_AlbumLightroomCollectionsByCollectionIdArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<_AlbumLightroomCollectionCondition>;
    filter?: Maybe<_AlbumLightroomCollectionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<_AlbumLightroomCollectionsOrderBy>>;
};
/** Lightroom Collection or Collection Set. This will be connected to an Album and the Lightroom Catalog. */
export declare type LightroomCollectionAlbumListArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<AlbumCondition>;
    filter?: Maybe<AlbumFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<AlbumsOrderBy>>;
};
/** Lightroom Collection or Collection Set. This will be connected to an Album and the Lightroom Catalog. */
export declare type LightroomCollectionCatalogListArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCatalogCondition>;
    filter?: Maybe<LightroomCatalogFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCatalogsOrderBy>>;
};
/** Lightroom Collection or Collection Set. This will be connected to an Album and the Lightroom Catalog. */
export declare type LightroomCollectionChildLightroomCollectionsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCollectionCondition>;
    filter?: Maybe<LightroomCollectionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCollectionsOrderBy>>;
};
/** Lightroom Collection or Collection Set. This will be connected to an Album and the Lightroom Catalog. */
export declare type LightroomCollectionLightroomCatalogsByLightroomCollectionParentIdAndCatalogIdArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCatalogCondition>;
    filter?: Maybe<LightroomCatalogFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCatalogsOrderBy>>;
};
/** Lightroom Collection or Collection Set. This will be connected to an Album and the Lightroom Catalog. */
export declare type LightroomCollectionLightroomMediaByLightroomMediaUniquenessCollectionIdAndLrMediaArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaCondition>;
    filter?: Maybe<LightroomMediaFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaOrderBy>>;
};
/** Lightroom Collection or Collection Set. This will be connected to an Album and the Lightroom Catalog. */
export declare type LightroomCollectionLightroomMediaUniquenessesByCollectionIdArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaUniquenessCondition>;
    filter?: Maybe<LightroomMediaUniquenessFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaUniquenessesOrderBy>>;
};
/** A connection to a list of `Album` values, with data from `_AlbumLightroomCollection`. */
export declare type LightroomCollectionAlbumListManyToManyConnection = {
    __typename?: 'LightroomCollectionAlbumListManyToManyConnection';
    /** A list of edges which contains the `Album`, info from the `_AlbumLightroomCollection`, and the cursor to aid in pagination. */
    edges: Array<LightroomCollectionAlbumListManyToManyEdge>;
    /** A list of `Album` objects. */
    nodes: Array<Album>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `Album` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `Album` edge in the connection, with data from `_AlbumLightroomCollection`. */
export declare type LightroomCollectionAlbumListManyToManyEdge = {
    __typename?: 'LightroomCollectionAlbumListManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `Album` at the end of the edge. */
    node: Album;
};
/** A connection to a list of `LightroomCatalog` values, with data from `LightroomMediaUniqueness`. */
export declare type LightroomCollectionCatalogListManyToManyConnection = {
    __typename?: 'LightroomCollectionCatalogListManyToManyConnection';
    /** A list of edges which contains the `LightroomCatalog`, info from the `LightroomMediaUniqueness`, and the cursor to aid in pagination. */
    edges: Array<LightroomCollectionCatalogListManyToManyEdge>;
    /** A list of `LightroomCatalog` objects. */
    nodes: Array<LightroomCatalog>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomCatalog` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomCatalog` edge in the connection, with data from `LightroomMediaUniqueness`. */
export declare type LightroomCollectionCatalogListManyToManyEdge = {
    __typename?: 'LightroomCollectionCatalogListManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** Reads and enables pagination through a set of `LightroomMediaUniqueness`. */
    lightroomMediaUniquenessesByCatalogId: LightroomMediaUniquenessesConnection;
    /** The `LightroomCatalog` at the end of the edge. */
    node: LightroomCatalog;
};
/** A `LightroomCatalog` edge in the connection, with data from `LightroomMediaUniqueness`. */
export declare type LightroomCollectionCatalogListManyToManyEdgeLightroomMediaUniquenessesByCatalogIdArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaUniquenessCondition>;
    filter?: Maybe<LightroomMediaUniquenessFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaUniquenessesOrderBy>>;
};
/**
 * A condition to be used against `LightroomCollection` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export declare type LightroomCollectionCondition = {
    /** Checks for equality with the object’s `catalogId` field. */
    catalogId?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `id` field. */
    id?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `parentId` field. */
    parentId?: Maybe<Scalars['Int']>;
};
/** A filter to be used against `LightroomCollection` object types. All fields are combined with a logical ‘and.’ */
export declare type LightroomCollectionFilter = {
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<LightroomCollectionFilter>>;
    /** Filter by the object’s `catalogId` field. */
    catalogId?: Maybe<IntFilter>;
    /** Filter by the object’s `id` field. */
    id?: Maybe<IntFilter>;
    /** Negates the expression. */
    not?: Maybe<LightroomCollectionFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<LightroomCollectionFilter>>;
    /** Filter by the object’s `parentId` field. */
    parentId?: Maybe<IntFilter>;
};
/** A connection to a list of `LightroomCatalog` values, with data from `LightroomCollection`. */
export declare type LightroomCollectionLightroomCatalogsByLightroomCollectionParentIdAndCatalogIdManyToManyConnection = {
    __typename?: 'LightroomCollectionLightroomCatalogsByLightroomCollectionParentIdAndCatalogIdManyToManyConnection';
    /** A list of edges which contains the `LightroomCatalog`, info from the `LightroomCollection`, and the cursor to aid in pagination. */
    edges: Array<LightroomCollectionLightroomCatalogsByLightroomCollectionParentIdAndCatalogIdManyToManyEdge>;
    /** A list of `LightroomCatalog` objects. */
    nodes: Array<LightroomCatalog>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomCatalog` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomCatalog` edge in the connection, with data from `LightroomCollection`. */
export declare type LightroomCollectionLightroomCatalogsByLightroomCollectionParentIdAndCatalogIdManyToManyEdge = {
    __typename?: 'LightroomCollectionLightroomCatalogsByLightroomCollectionParentIdAndCatalogIdManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** Reads and enables pagination through a set of `LightroomCollection`. */
    lightroomCollectionsByCatalogId: LightroomCollectionsConnection;
    /** The `LightroomCatalog` at the end of the edge. */
    node: LightroomCatalog;
};
/** A `LightroomCatalog` edge in the connection, with data from `LightroomCollection`. */
export declare type LightroomCollectionLightroomCatalogsByLightroomCollectionParentIdAndCatalogIdManyToManyEdgeLightroomCollectionsByCatalogIdArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCollectionCondition>;
    filter?: Maybe<LightroomCollectionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCollectionsOrderBy>>;
};
/** A connection to a list of `LightroomMedia` values, with data from `LightroomMediaUniqueness`. */
export declare type LightroomCollectionLightroomMediaByLightroomMediaUniquenessCollectionIdAndLrMediaManyToManyConnection = {
    __typename?: 'LightroomCollectionLightroomMediaByLightroomMediaUniquenessCollectionIdAndLrMediaManyToManyConnection';
    /** A list of edges which contains the `LightroomMedia`, info from the `LightroomMediaUniqueness`, and the cursor to aid in pagination. */
    edges: Array<LightroomCollectionLightroomMediaByLightroomMediaUniquenessCollectionIdAndLrMediaManyToManyEdge>;
    /** A list of `LightroomMedia` objects. */
    nodes: Array<LightroomMedia>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomMedia` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomMedia` edge in the connection, with data from `LightroomMediaUniqueness`. */
export declare type LightroomCollectionLightroomMediaByLightroomMediaUniquenessCollectionIdAndLrMediaManyToManyEdge = {
    __typename?: 'LightroomCollectionLightroomMediaByLightroomMediaUniquenessCollectionIdAndLrMediaManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** Reads and enables pagination through a set of `LightroomMediaUniqueness`. */
    lightroomMediaUniquenessesByLrMedia: LightroomMediaUniquenessesConnection;
    /** The `LightroomMedia` at the end of the edge. */
    node: LightroomMedia;
};
/** A `LightroomMedia` edge in the connection, with data from `LightroomMediaUniqueness`. */
export declare type LightroomCollectionLightroomMediaByLightroomMediaUniquenessCollectionIdAndLrMediaManyToManyEdgeLightroomMediaUniquenessesByLrMediaArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaUniquenessCondition>;
    filter?: Maybe<LightroomMediaUniquenessFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaUniquenessesOrderBy>>;
};
/** A connection to a list of `LightroomCollection` values. */
export declare type LightroomCollectionsConnection = {
    __typename?: 'LightroomCollectionsConnection';
    /** A list of edges which contains the `LightroomCollection` and cursor to aid in pagination. */
    edges: Array<LightroomCollectionsEdge>;
    /** A list of `LightroomCollection` objects. */
    nodes: Array<LightroomCollection>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomCollection` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomCollection` edge in the connection. */
export declare type LightroomCollectionsEdge = {
    __typename?: 'LightroomCollectionsEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `LightroomCollection` at the end of the edge. */
    node: LightroomCollection;
};
/** Methods to use when ordering `LightroomCollection`. */
export declare enum LightroomCollectionsOrderBy {
    CatalogIdAsc = "CATALOG_ID_ASC",
    CatalogIdDesc = "CATALOG_ID_DESC",
    IdAsc = "ID_ASC",
    IdDesc = "ID_DESC",
    Natural = "NATURAL",
    ParentIdAsc = "PARENT_ID_ASC",
    ParentIdDesc = "PARENT_ID_DESC",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
export declare type LightroomMasterMediaInputPayload = {
    localIdentifier: Scalars['Int'];
    lrUuidIdentifier: Scalars['String'];
};
/** Lightroom media, direct access to this is allowed only through the plugin. This is kept in sync with the Media record. */
export declare type LightroomMedia = Node & {
    __typename?: 'LightroomMedia';
    /** Reads and enables pagination through a set of `LightroomCatalog`. */
    catalogList: LightroomMediaCatalogListManyToManyConnection;
    /** Reads and enables pagination through a set of `LightroomCollection`. */
    collectionList: LightroomMediaCollectionListManyToManyConnection;
    createdAt: Scalars['Datetime'];
    id: Scalars['Int'];
    /** Reads and enables pagination through a set of `LightroomMediaUniqueness`. */
    lightroomMediaUniquenessesByLrMedia: LightroomMediaUniquenessesConnection;
    /** Reads a single `Media` that is related to this `LightroomMedia`. */
    media?: Maybe<Media>;
    /** 1-1 relation Media - Ligtroom Media */
    mediaId: Scalars['Int'];
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
    updatedAt: Scalars['Datetime'];
    /** UUID v4 identifier given by the Lighroom Catalog. The docs does not say is this unique withing the catalog or it is a random uuidv4 value. @TODO if it breaks fix it */
    uuidIdentifier: Scalars['UUID'];
};
/** Lightroom media, direct access to this is allowed only through the plugin. This is kept in sync with the Media record. */
export declare type LightroomMediaCatalogListArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCatalogCondition>;
    filter?: Maybe<LightroomCatalogFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCatalogsOrderBy>>;
};
/** Lightroom media, direct access to this is allowed only through the plugin. This is kept in sync with the Media record. */
export declare type LightroomMediaCollectionListArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCollectionCondition>;
    filter?: Maybe<LightroomCollectionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCollectionsOrderBy>>;
};
/** Lightroom media, direct access to this is allowed only through the plugin. This is kept in sync with the Media record. */
export declare type LightroomMediaLightroomMediaUniquenessesByLrMediaArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaUniquenessCondition>;
    filter?: Maybe<LightroomMediaUniquenessFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaUniquenessesOrderBy>>;
};
/** A connection to a list of `LightroomCatalog` values, with data from `LightroomMediaUniqueness`. */
export declare type LightroomMediaCatalogListManyToManyConnection = {
    __typename?: 'LightroomMediaCatalogListManyToManyConnection';
    /** A list of edges which contains the `LightroomCatalog`, info from the `LightroomMediaUniqueness`, and the cursor to aid in pagination. */
    edges: Array<LightroomMediaCatalogListManyToManyEdge>;
    /** A list of `LightroomCatalog` objects. */
    nodes: Array<LightroomCatalog>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomCatalog` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomCatalog` edge in the connection, with data from `LightroomMediaUniqueness`. */
export declare type LightroomMediaCatalogListManyToManyEdge = {
    __typename?: 'LightroomMediaCatalogListManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** Reads and enables pagination through a set of `LightroomMediaUniqueness`. */
    lightroomMediaUniquenessesByCatalogId: LightroomMediaUniquenessesConnection;
    /** The `LightroomCatalog` at the end of the edge. */
    node: LightroomCatalog;
};
/** A `LightroomCatalog` edge in the connection, with data from `LightroomMediaUniqueness`. */
export declare type LightroomMediaCatalogListManyToManyEdgeLightroomMediaUniquenessesByCatalogIdArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaUniquenessCondition>;
    filter?: Maybe<LightroomMediaUniquenessFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaUniquenessesOrderBy>>;
};
/** A connection to a list of `LightroomCollection` values, with data from `LightroomMediaUniqueness`. */
export declare type LightroomMediaCollectionListManyToManyConnection = {
    __typename?: 'LightroomMediaCollectionListManyToManyConnection';
    /** A list of edges which contains the `LightroomCollection`, info from the `LightroomMediaUniqueness`, and the cursor to aid in pagination. */
    edges: Array<LightroomMediaCollectionListManyToManyEdge>;
    /** A list of `LightroomCollection` objects. */
    nodes: Array<LightroomCollection>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomCollection` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomCollection` edge in the connection, with data from `LightroomMediaUniqueness`. */
export declare type LightroomMediaCollectionListManyToManyEdge = {
    __typename?: 'LightroomMediaCollectionListManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** Reads and enables pagination through a set of `LightroomMediaUniqueness`. */
    lightroomMediaUniquenessesByCollectionId: LightroomMediaUniquenessesConnection;
    /** The `LightroomCollection` at the end of the edge. */
    node: LightroomCollection;
};
/** A `LightroomCollection` edge in the connection, with data from `LightroomMediaUniqueness`. */
export declare type LightroomMediaCollectionListManyToManyEdgeLightroomMediaUniquenessesByCollectionIdArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaUniquenessCondition>;
    filter?: Maybe<LightroomMediaUniquenessFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaUniquenessesOrderBy>>;
};
/**
 * A condition to be used against `LightroomMedia` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export declare type LightroomMediaCondition = {
    /** Checks for equality with the object’s `id` field. */
    id?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `mediaId` field. */
    mediaId?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `uuidIdentifier` field. */
    uuidIdentifier?: Maybe<Scalars['UUID']>;
};
/** A connection to a list of `LightroomMedia` values. */
export declare type LightroomMediaConnection = {
    __typename?: 'LightroomMediaConnection';
    /** A list of edges which contains the `LightroomMedia` and cursor to aid in pagination. */
    edges: Array<LightroomMediaEdge>;
    /** A list of `LightroomMedia` objects. */
    nodes: Array<LightroomMedia>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomMedia` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomMedia` edge in the connection. */
export declare type LightroomMediaEdge = {
    __typename?: 'LightroomMediaEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `LightroomMedia` at the end of the edge. */
    node: LightroomMedia;
};
/** A filter to be used against `LightroomMedia` object types. All fields are combined with a logical ‘and.’ */
export declare type LightroomMediaFilter = {
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<LightroomMediaFilter>>;
    /** Filter by the object’s `id` field. */
    id?: Maybe<IntFilter>;
    /** Filter by the object’s `mediaId` field. */
    mediaId?: Maybe<IntFilter>;
    /** Negates the expression. */
    not?: Maybe<LightroomMediaFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<LightroomMediaFilter>>;
    /** Filter by the object’s `uuidIdentifier` field. */
    uuidIdentifier?: Maybe<UuidFilter>;
};
/** Methods to use when ordering `LightroomMedia`. */
export declare enum LightroomMediaOrderBy {
    IdAsc = "ID_ASC",
    IdDesc = "ID_DESC",
    MediaIdAsc = "MEDIA_ID_ASC",
    MediaIdDesc = "MEDIA_ID_DESC",
    Natural = "NATURAL",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC",
    UuidIdentifierAsc = "UUID_IDENTIFIER_ASC",
    UuidIdentifierDesc = "UUID_IDENTIFIER_DESC"
}
/** Mapping table for the album and Lightroom Collection. This allows us to disconnect the Album and make connections to other service providers. */
export declare type LightroomMediaUniqueness = {
    __typename?: 'LightroomMediaUniqueness';
    /** Reads a single `LightroomCatalog` that is related to this `LightroomMediaUniqueness`. */
    catalog?: Maybe<LightroomCatalog>;
    /** Connection to the Lightroom Catalog */
    catalogId: Scalars['Int'];
    /** Reads a single `LightroomCollection` that is related to this `LightroomMediaUniqueness`. */
    collection?: Maybe<LightroomCollection>;
    /** Lightroom Collection in which the media is present. */
    collectionId?: Maybe<Scalars['Int']>;
    /** Reads a single `LightroomMedia` that is related to this `LightroomMediaUniqueness`. */
    lightroomMediaByLrMedia?: Maybe<LightroomMedia>;
    /** A unique number identifier within the Lightroom Catalog. If this media is present in the other catalog it will have different local_identifier */
    localIdentifier: Scalars['Int'];
    /** Connection to the Lightroom Media */
    lrMedia: Scalars['Int'];
};
/**
 * A condition to be used against `LightroomMediaUniqueness` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export declare type LightroomMediaUniquenessCondition = {
    /** Checks for equality with the object’s `catalogId` field. */
    catalogId?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `collectionId` field. */
    collectionId?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `localIdentifier` field. */
    localIdentifier?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `lrMedia` field. */
    lrMedia?: Maybe<Scalars['Int']>;
};
/** A filter to be used against `LightroomMediaUniqueness` object types. All fields are combined with a logical ‘and.’ */
export declare type LightroomMediaUniquenessFilter = {
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<LightroomMediaUniquenessFilter>>;
    /** Filter by the object’s `catalogId` field. */
    catalogId?: Maybe<IntFilter>;
    /** Filter by the object’s `collectionId` field. */
    collectionId?: Maybe<IntFilter>;
    /** Filter by the object’s `localIdentifier` field. */
    localIdentifier?: Maybe<IntFilter>;
    /** Filter by the object’s `lrMedia` field. */
    lrMedia?: Maybe<IntFilter>;
    /** Negates the expression. */
    not?: Maybe<LightroomMediaUniquenessFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<LightroomMediaUniquenessFilter>>;
};
/** A connection to a list of `LightroomMediaUniqueness` values. */
export declare type LightroomMediaUniquenessesConnection = {
    __typename?: 'LightroomMediaUniquenessesConnection';
    /** A list of edges which contains the `LightroomMediaUniqueness` and cursor to aid in pagination. */
    edges: Array<LightroomMediaUniquenessesEdge>;
    /** A list of `LightroomMediaUniqueness` objects. */
    nodes: Array<LightroomMediaUniqueness>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `LightroomMediaUniqueness` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `LightroomMediaUniqueness` edge in the connection. */
export declare type LightroomMediaUniquenessesEdge = {
    __typename?: 'LightroomMediaUniquenessesEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `LightroomMediaUniqueness` at the end of the edge. */
    node: LightroomMediaUniqueness;
};
/** Methods to use when ordering `LightroomMediaUniqueness`. */
export declare enum LightroomMediaUniquenessesOrderBy {
    CatalogIdAsc = "CATALOG_ID_ASC",
    CatalogIdDesc = "CATALOG_ID_DESC",
    CollectionIdAsc = "COLLECTION_ID_ASC",
    CollectionIdDesc = "COLLECTION_ID_DESC",
    LocalIdentifierAsc = "LOCAL_IDENTIFIER_ASC",
    LocalIdentifierDesc = "LOCAL_IDENTIFIER_DESC",
    LrMediaAsc = "LR_MEDIA_ASC",
    LrMediaDesc = "LR_MEDIA_DESC",
    Natural = "NATURAL"
}
export declare type LightroomRemoveMediaFromCollectionInputPayload = {
    lrCollectionId: Scalars['Int'];
    mediaId: Scalars['Int'];
};
export declare type LightroomRemoveMediaFromCollectionResponse = {
    __typename?: 'LightroomRemoveMediaFromCollectionResponse';
    deleted?: Maybe<Scalars['Boolean']>;
};
export declare type LightroomSyncCatalogInputPayload = {
    collections: Scalars['JSON'];
    collectionSets: Scalars['JSON'];
    id?: Maybe<Scalars['Int']>;
    name?: Maybe<Scalars['String']>;
    tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare type LightroomSyncCatalogResponse = {
    __typename?: 'LightroomSyncCatalogResponse';
    catalog?: Maybe<LightroomCatalog>;
};
export declare type LightroomSyncCollectionInputPayload = {
    catalogId: Scalars['Int'];
    id?: Maybe<Scalars['Int']>;
    isSmart?: Maybe<Scalars['Boolean']>;
    localIdentifier: Scalars['Int'];
    parentId?: Maybe<Scalars['Int']>;
    searchDescription?: Maybe<Scalars['JSON']>;
    title: Scalars['String'];
};
export declare type LightroomSyncCollectionResponse = {
    __typename?: 'LightroomSyncCollectionResponse';
    collection?: Maybe<LightroomCollection>;
};
export declare type LightroomSyncMediaInputPayload = {
    caption?: Maybe<Scalars['String']>;
    catalogId: Scalars['Int'];
    currentCollectionId: Scalars['Int'];
    gps?: Maybe<GpsInputPayload>;
    headline?: Maybe<Scalars['String']>;
    isVirtualCopy?: Maybe<Scalars['Boolean']>;
    localIdentifier: Scalars['Int'];
    lrUuidIdentifier: Scalars['String'];
    masterMedia?: Maybe<LightroomMasterMediaInputPayload>;
    mediaId?: Maybe<Scalars['Int']>;
    title?: Maybe<Scalars['String']>;
};
export declare type LightroomSyncMediaResponse = {
    __typename?: 'LightroomSyncMediaResponse';
    media?: Maybe<LightroomMedia>;
};
export declare type LightroomSyncRenditionResponse = {
    __typename?: 'LightroomSyncRenditionResponse';
    rendition?: Maybe<Rendition>;
};
/** All media, photos, videos and other */
export declare type Media = Node & {
    __typename?: 'Media';
    /** Reads and enables pagination through a set of `AlbumMedia`. */
    albumMedias: AlbumMediaConnection;
    /** Reads and enables pagination through a set of `Album`. */
    albums: MediaAlbumsManyToManyConnection;
    aperture?: Maybe<Scalars['String']>;
    /** A textual description, including captions, of the image. https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#description */
    caption?: Maybe<Scalars['String']>;
    /** Reads and enables pagination through a set of `Copyright`. */
    copyrights: CopyrightsConnection;
    createdAt: Scalars['Datetime'];
    /** Self Soverign Identity or URI. In case of the URI it needs to be properly formatted according to https://www.rfc-editor.org/rfc/rfc3986.html#section-3.1 */
    creator?: Maybe<Scalars['String']>;
    /** this maps to exif:dateTimeOriginal and xmp:DateCreated */
    dateCreated?: Maybe<Scalars['Datetime']>;
    dateDigitalized?: Maybe<Scalars['Datetime']>;
    /** Reads and enables pagination through a set of `Device`. */
    devices: MediaDevicesManyToManyConnection;
    didFlashFired?: Maybe<Scalars['Boolean']>;
    /** video duration in seconds */
    durationInSeconds?: Maybe<Scalars['Int']>;
    exposureBias?: Maybe<Scalars['String']>;
    exposureProgram?: Maybe<Scalars['String']>;
    /** `Exif.Image.ExposureTime` Exposure time, given in seconds. [Tags](https://www.exiv2.org/tags.html) */
    exposureTime?: Maybe<Scalars['String']>;
    focalLength?: Maybe<Scalars['String']>;
    gps?: Maybe<Scalars['JSON']>;
    /** A brief synopsis of the caption. Headline is not the same as Title. Enter a brief publishable synopsis or summary of the contents of the image */
    headline?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    isoSpeedRating?: Maybe<Scalars['Float']>;
    isPrivate?: Maybe<Scalars['Boolean']>;
    isVideo?: Maybe<Scalars['Boolean']>;
    isVirtualCopy?: Maybe<Scalars['Boolean']>;
    /** Editable Media keywords. */
    keywords: Scalars['JSON'];
    /** Reads and enables pagination through a set of `LightroomMedia`. */
    lightroomMedias: LightroomMediaConnection;
    /** Reads a single `Media` that is related to this `Media`. */
    masterMedia?: Maybe<Media>;
    /** If the photo is a virtual copy then this is the master photo relation. */
    masterMediaId?: Maybe<Scalars['Int']>;
    /** Reads and enables pagination through a set of `Media`. */
    mediaByMasterMediaId: MediaConnection;
    /** Reads and enables pagination through a set of `MediaDevice`. */
    mediaDevices: MediaDevicesConnection;
    meteringMode?: Maybe<Scalars['String']>;
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
    /** perceptual hash @anagolay/op-an-perceptual-hash  npm package */
    phash?: Maybe<Scalars['String']>;
    /** Anagolay Network  Proof of Existence ID */
    poeId?: Maybe<Scalars['String']>;
    /** Reads and enables pagination through a set of `Rendition`. */
    renditions: RenditionsConnection;
    shutterSpeed?: Maybe<Scalars['String']>;
    /** slug of the title */
    slug?: Maybe<Scalars['String']>;
    /** A shorthand reference for the digital image. Title provides a short human readable name which can be a text and/or numeric reference. It is not the same as Headline. Enter a short verbal and human readable name for the image, this may be the file name. https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#title */
    title?: Maybe<Scalars['String']>;
    updatedAt: Scalars['Datetime'];
};
/** All media, photos, videos and other */
export declare type MediaAlbumMediasArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<AlbumMediaCondition>;
    filter?: Maybe<AlbumMediaFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<AlbumMediaOrderBy>>;
};
/** All media, photos, videos and other */
export declare type MediaAlbumsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<AlbumCondition>;
    filter?: Maybe<AlbumFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<AlbumsOrderBy>>;
};
/** All media, photos, videos and other */
export declare type MediaCopyrightsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<CopyrightCondition>;
    filter?: Maybe<CopyrightFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<CopyrightsOrderBy>>;
};
/** All media, photos, videos and other */
export declare type MediaDevicesArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<DeviceCondition>;
    filter?: Maybe<DeviceFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<DevicesOrderBy>>;
};
/** All media, photos, videos and other */
export declare type MediaLightroomMediasArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaCondition>;
    filter?: Maybe<LightroomMediaFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaOrderBy>>;
};
/** All media, photos, videos and other */
export declare type MediaMediaByMasterMediaIdArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<MediaCondition>;
    filter?: Maybe<MediaFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<MediaOrderBy>>;
};
/** All media, photos, videos and other */
export declare type MediaMediaDevicesArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<MediaDeviceCondition>;
    filter?: Maybe<MediaDeviceFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<MediaDevicesOrderBy>>;
};
/** All media, photos, videos and other */
export declare type MediaRenditionsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<RenditionCondition>;
    filter?: Maybe<RenditionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<RenditionsOrderBy>>;
};
/** A connection to a list of `Album` values, with data from `AlbumMedia`. */
export declare type MediaAlbumsManyToManyConnection = {
    __typename?: 'MediaAlbumsManyToManyConnection';
    /** A list of edges which contains the `Album`, info from the `AlbumMedia`, and the cursor to aid in pagination. */
    edges: Array<MediaAlbumsManyToManyEdge>;
    /** A list of `Album` objects. */
    nodes: Array<Album>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `Album` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `Album` edge in the connection, with data from `AlbumMedia`. */
export declare type MediaAlbumsManyToManyEdge = {
    __typename?: 'MediaAlbumsManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `Album` at the end of the edge. */
    node: Album;
};
/** A condition to be used against `Media` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export declare type MediaCondition = {
    /** Checks for equality with the object’s `dateCreated` field. */
    dateCreated?: Maybe<Scalars['Datetime']>;
    /** Checks for equality with the object’s `id` field. */
    id?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `isVideo` field. */
    isVideo?: Maybe<Scalars['Boolean']>;
    /** Checks for equality with the object’s `masterMediaId` field. */
    masterMediaId?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `phash` field. */
    phash?: Maybe<Scalars['String']>;
    /** Checks for equality with the object’s `poeId` field. */
    poeId?: Maybe<Scalars['String']>;
};
/** A connection to a list of `Media` values. */
export declare type MediaConnection = {
    __typename?: 'MediaConnection';
    /** A list of edges which contains the `Media` and cursor to aid in pagination. */
    edges: Array<MediaEdge>;
    /** A list of `Media` objects. */
    nodes: Array<Media>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `Media` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** Information needed to store the copyright for a given media via its Proof-of-Existence */
export declare type MediaCopyright = {
    /** Proof of existence as specified [HERE](https://sensio.dev/network/protocol/proof.html) */
    poeId: Scalars['String'];
    /** URN based signer address urn:pgp:key-fingerprint */
    signer: Scalars['String'];
    /**
     * IPTC entity for the copyright. check the type or go [here](https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#entity-or-concept-structure) for the declaration
     * Identifier is a StatementID decoded from the chain. It's a [CID](https://sensio.dev/
     * Name for this statement, this is autogenerated field and it can be anythingglossary.html#cid)
     */
    statementId: Scalars['String'];
};
/** Mapping table for a media to the equipment it was taken with. */
export declare type MediaDevice = {
    __typename?: 'MediaDevice';
    /** Reads a single `Device` that is related to this `MediaDevice`. */
    device?: Maybe<Device>;
    deviceId: Scalars['Int'];
    /** Reads a single `Media` that is related to this `MediaDevice`. */
    media?: Maybe<Media>;
    mediaId: Scalars['Int'];
};
/**
 * A condition to be used against `MediaDevice` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export declare type MediaDeviceCondition = {
    /** Checks for equality with the object’s `deviceId` field. */
    deviceId?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `mediaId` field. */
    mediaId?: Maybe<Scalars['Int']>;
};
/** A filter to be used against `MediaDevice` object types. All fields are combined with a logical ‘and.’ */
export declare type MediaDeviceFilter = {
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<MediaDeviceFilter>>;
    /** Filter by the object’s `deviceId` field. */
    deviceId?: Maybe<IntFilter>;
    /** Filter by the object’s `mediaId` field. */
    mediaId?: Maybe<IntFilter>;
    /** Negates the expression. */
    not?: Maybe<MediaDeviceFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<MediaDeviceFilter>>;
};
/** Represents an update to a `MediaDevice`. Fields that are set will be updated. */
export declare type MediaDevicePatch = {
    deviceId?: Maybe<Scalars['Int']>;
    mediaId?: Maybe<Scalars['Int']>;
};
/** A connection to a list of `MediaDevice` values. */
export declare type MediaDevicesConnection = {
    __typename?: 'MediaDevicesConnection';
    /** A list of edges which contains the `MediaDevice` and cursor to aid in pagination. */
    edges: Array<MediaDevicesEdge>;
    /** A list of `MediaDevice` objects. */
    nodes: Array<MediaDevice>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `MediaDevice` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `MediaDevice` edge in the connection. */
export declare type MediaDevicesEdge = {
    __typename?: 'MediaDevicesEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `MediaDevice` at the end of the edge. */
    node: MediaDevice;
};
/** A connection to a list of `Device` values, with data from `MediaDevice`. */
export declare type MediaDevicesManyToManyConnection = {
    __typename?: 'MediaDevicesManyToManyConnection';
    /** A list of edges which contains the `Device`, info from the `MediaDevice`, and the cursor to aid in pagination. */
    edges: Array<MediaDevicesManyToManyEdge>;
    /** A list of `Device` objects. */
    nodes: Array<Device>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `Device` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `Device` edge in the connection, with data from `MediaDevice`. */
export declare type MediaDevicesManyToManyEdge = {
    __typename?: 'MediaDevicesManyToManyEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `Device` at the end of the edge. */
    node: Device;
};
/** Methods to use when ordering `MediaDevice`. */
export declare enum MediaDevicesOrderBy {
    DeviceIdAsc = "DEVICE_ID_ASC",
    DeviceIdDesc = "DEVICE_ID_DESC",
    MediaIdAsc = "MEDIA_ID_ASC",
    MediaIdDesc = "MEDIA_ID_DESC",
    Natural = "NATURAL"
}
/** A `Media` edge in the connection. */
export declare type MediaEdge = {
    __typename?: 'MediaEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `Media` at the end of the edge. */
    node: Media;
};
/** A filter to be used against `Media` object types. All fields are combined with a logical ‘and.’ */
export declare type MediaFilter = {
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<MediaFilter>>;
    /** Filter by the object’s `dateCreated` field. */
    dateCreated?: Maybe<DatetimeFilter>;
    /** Filter by the object’s `id` field. */
    id?: Maybe<IntFilter>;
    /** Filter by the object’s `isVideo` field. */
    isVideo?: Maybe<BooleanFilter>;
    /** Filter by the object’s `masterMediaId` field. */
    masterMediaId?: Maybe<IntFilter>;
    /** Negates the expression. */
    not?: Maybe<MediaFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<MediaFilter>>;
    /** Filter by the object’s `phash` field. */
    phash?: Maybe<StringFilter>;
    /** Filter by the object’s `poeId` field. */
    poeId?: Maybe<StringFilter>;
};
/** An input for mutations affecting `Media` */
export declare type MediaInput = {
    aperture?: Maybe<Scalars['String']>;
    /** A textual description, including captions, of the image. https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#description */
    caption?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['Datetime']>;
    /** Self Soverign Identity or URI. In case of the URI it needs to be properly formatted according to https://www.rfc-editor.org/rfc/rfc3986.html#section-3.1 */
    creator?: Maybe<Scalars['String']>;
    /** this maps to exif:dateTimeOriginal and xmp:DateCreated */
    dateCreated?: Maybe<Scalars['Datetime']>;
    dateDigitalized?: Maybe<Scalars['Datetime']>;
    didFlashFired?: Maybe<Scalars['Boolean']>;
    /** video duration in seconds */
    durationInSeconds?: Maybe<Scalars['Int']>;
    exposureBias?: Maybe<Scalars['String']>;
    exposureProgram?: Maybe<Scalars['String']>;
    /** `Exif.Image.ExposureTime` Exposure time, given in seconds. [Tags](https://www.exiv2.org/tags.html) */
    exposureTime?: Maybe<Scalars['String']>;
    focalLength?: Maybe<Scalars['String']>;
    gps?: Maybe<Scalars['JSON']>;
    /** A brief synopsis of the caption. Headline is not the same as Title. Enter a brief publishable synopsis or summary of the contents of the image */
    headline?: Maybe<Scalars['String']>;
    isoSpeedRating?: Maybe<Scalars['Float']>;
    isPrivate?: Maybe<Scalars['Boolean']>;
    isVideo?: Maybe<Scalars['Boolean']>;
    isVirtualCopy?: Maybe<Scalars['Boolean']>;
    /** Editable Media keywords. */
    keywords?: Maybe<Scalars['JSON']>;
    /** If the photo is a virtual copy then this is the master photo relation. */
    masterMediaId?: Maybe<Scalars['Int']>;
    meteringMode?: Maybe<Scalars['String']>;
    /** perceptual hash @anagolay/op-an-perceptual-hash  npm package */
    phash?: Maybe<Scalars['String']>;
    /** Anagolay Network  Proof of Existence ID */
    poeId?: Maybe<Scalars['String']>;
    shutterSpeed?: Maybe<Scalars['String']>;
    /** slug of the title */
    slug?: Maybe<Scalars['String']>;
    /** A shorthand reference for the digital image. Title provides a short human readable name which can be a text and/or numeric reference. It is not the same as Headline. Enter a short verbal and human readable name for the image, this may be the file name. https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#title */
    title?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['Datetime']>;
};
/** Methods to use when ordering `Media`. */
export declare enum MediaOrderBy {
    DateCreatedAsc = "DATE_CREATED_ASC",
    DateCreatedDesc = "DATE_CREATED_DESC",
    IdAsc = "ID_ASC",
    IdDesc = "ID_DESC",
    IsVideoAsc = "IS_VIDEO_ASC",
    IsVideoDesc = "IS_VIDEO_DESC",
    MasterMediaIdAsc = "MASTER_MEDIA_ID_ASC",
    MasterMediaIdDesc = "MASTER_MEDIA_ID_DESC",
    Natural = "NATURAL",
    PhashAsc = "PHASH_ASC",
    PhashDesc = "PHASH_DESC",
    PoeIdAsc = "POE_ID_ASC",
    PoeIdDesc = "POE_ID_DESC",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
/** Represents an update to a `Media`. Fields that are set will be updated. */
export declare type MediaPatch = {
    aperture?: Maybe<Scalars['String']>;
    /** A textual description, including captions, of the image. https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#description */
    caption?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['Datetime']>;
    /** Self Soverign Identity or URI. In case of the URI it needs to be properly formatted according to https://www.rfc-editor.org/rfc/rfc3986.html#section-3.1 */
    creator?: Maybe<Scalars['String']>;
    /** this maps to exif:dateTimeOriginal and xmp:DateCreated */
    dateCreated?: Maybe<Scalars['Datetime']>;
    dateDigitalized?: Maybe<Scalars['Datetime']>;
    didFlashFired?: Maybe<Scalars['Boolean']>;
    /** video duration in seconds */
    durationInSeconds?: Maybe<Scalars['Int']>;
    exposureBias?: Maybe<Scalars['String']>;
    exposureProgram?: Maybe<Scalars['String']>;
    /** `Exif.Image.ExposureTime` Exposure time, given in seconds. [Tags](https://www.exiv2.org/tags.html) */
    exposureTime?: Maybe<Scalars['String']>;
    focalLength?: Maybe<Scalars['String']>;
    gps?: Maybe<Scalars['JSON']>;
    /** A brief synopsis of the caption. Headline is not the same as Title. Enter a brief publishable synopsis or summary of the contents of the image */
    headline?: Maybe<Scalars['String']>;
    isoSpeedRating?: Maybe<Scalars['Float']>;
    isPrivate?: Maybe<Scalars['Boolean']>;
    isVideo?: Maybe<Scalars['Boolean']>;
    isVirtualCopy?: Maybe<Scalars['Boolean']>;
    /** Editable Media keywords. */
    keywords?: Maybe<Scalars['JSON']>;
    /** If the photo is a virtual copy then this is the master photo relation. */
    masterMediaId?: Maybe<Scalars['Int']>;
    meteringMode?: Maybe<Scalars['String']>;
    /** perceptual hash @anagolay/op-an-perceptual-hash  npm package */
    phash?: Maybe<Scalars['String']>;
    /** Anagolay Network  Proof of Existence ID */
    poeId?: Maybe<Scalars['String']>;
    shutterSpeed?: Maybe<Scalars['String']>;
    /** slug of the title */
    slug?: Maybe<Scalars['String']>;
    /** A shorthand reference for the digital image. Title provides a short human readable name which can be a text and/or numeric reference. It is not the same as Headline. Enter a short verbal and human readable name for the image, this may be the file name. https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#title */
    title?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['Datetime']>;
};
/** If this is true then all updates are done and saved. Listen for errors in case of the failures. */
export declare type MediaPayload = {
    __typename?: 'MediaPayload';
    /** How many records we inserted. This will be a nubmer === inserted.length or 0 of there are no inserted records. In that case it means we already have them in the DB */
    inserted: Scalars['Int'];
    /** How many records we passed in. */
    passed: Scalars['Int'];
    /** Did we succeed with mutation. Pretty much everything will succeed unless there are DB errors. It will succeed even if there are multiple values already stored. In that case check next return param */
    success: Scalars['Boolean'];
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type Mutation = {
    __typename?: 'Mutation';
    /** Creates a single `Album`. */
    createAlbum?: Maybe<CreateAlbumPayload>;
    /** Creates a single `AlbumMedia`. */
    createAlbumMedia?: Maybe<CreateAlbumMediaPayload>;
    /** Creates a single `Copyright`. */
    createCopyright?: Maybe<CreateCopyrightPayload>;
    /** Creates a single `Device`. */
    createDevice?: Maybe<CreateDevicePayload>;
    /** Creates a single `Media`. */
    createMedia?: Maybe<CreateMediaPayload>;
    /** Creates a single `Rendition`. */
    createRendition?: Maybe<CreateRenditionPayload>;
    /** Creates a single `UserEmail`. */
    createUserEmail?: Maybe<CreateUserEmailPayload>;
    /** Deletes a single `Album` using a unique key. */
    deleteAlbum?: Maybe<DeleteAlbumPayload>;
    /** Deletes a single `Album` using its globally unique id. */
    deleteAlbumByNodeId?: Maybe<DeleteAlbumPayload>;
    /** Deletes a single `AlbumMedia` using a unique key. */
    deleteAlbumMedia?: Maybe<DeleteAlbumMediaPayload>;
    /** Deletes a single `AlbumMedia` using its globally unique id. */
    deleteAlbumMediaByNodeId?: Maybe<DeleteAlbumMediaPayload>;
    /** Deletes a single `Copyright` using a unique key. */
    deleteCopyright?: Maybe<DeleteCopyrightPayload>;
    /** Deletes a single `Copyright` using its globally unique id. */
    deleteCopyrightByNodeId?: Maybe<DeleteCopyrightPayload>;
    /** Deletes a single `Device` using a unique key. */
    deleteDevice?: Maybe<DeleteDevicePayload>;
    /** Deletes a single `Device` using a unique key. */
    deleteDeviceByCid?: Maybe<DeleteDevicePayload>;
    /** Deletes a single `Device` using its globally unique id. */
    deleteDeviceByNodeId?: Maybe<DeleteDevicePayload>;
    /** Deletes a single `Media` using a unique key. */
    deleteMedia?: Maybe<DeleteMediaPayload>;
    /** Deletes a single `Media` using its globally unique id. */
    deleteMediaByNodeId?: Maybe<DeleteMediaPayload>;
    /** Deletes a single `MediaDevice` using a unique key. */
    deleteMediaDeviceByMediaIdAndDeviceId?: Maybe<DeleteMediaDevicePayload>;
    /** Deletes a single `Rendition` using a unique key. */
    deleteRendition?: Maybe<DeleteRenditionPayload>;
    /** Deletes a single `Rendition` using a unique key. */
    deleteRenditionByCid?: Maybe<DeleteRenditionPayload>;
    /** Deletes a single `Rendition` using a unique key. */
    deleteRenditionByMediaIdAndIsMaster?: Maybe<DeleteRenditionPayload>;
    /** Deletes a single `Rendition` using its globally unique id. */
    deleteRenditionByNodeId?: Maybe<DeleteRenditionPayload>;
    /** Deletes a single `User` using a unique key. */
    deleteUser?: Maybe<DeleteUserPayload>;
    /** Deletes a single `UserAuthentication` using a unique key. */
    deleteUserAuthentication?: Maybe<DeleteUserAuthenticationPayload>;
    /** Deletes a single `UserAuthentication` using its globally unique id. */
    deleteUserAuthenticationByNodeId?: Maybe<DeleteUserAuthenticationPayload>;
    /** Deletes a single `UserAuthentication` using a unique key. */
    deleteUserAuthenticationByServiceAndIdentifier?: Maybe<DeleteUserAuthenticationPayload>;
    /** Deletes a single `User` using its globally unique id. */
    deleteUserByNodeId?: Maybe<DeleteUserPayload>;
    /** Deletes a single `User` using a unique key. */
    deleteUserByUsername?: Maybe<DeleteUserPayload>;
    /** Deletes a single `UserEmail` using a unique key. */
    deleteUserEmail?: Maybe<DeleteUserEmailPayload>;
    /** Deletes a single `UserEmail` using its globally unique id. */
    deleteUserEmailByNodeId?: Maybe<DeleteUserEmailPayload>;
    /** Deletes a single `UserEmail` using a unique key. */
    deleteUserEmailByUserIdAndEmail?: Maybe<DeleteUserEmailPayload>;
    /** This mutation removes the MEDIA from the Album and the LrMediaUniqueness. If all goes well the return will be TRUE, in any other case there will be an error. The mutation accepts media ID which is the REAL media and the Lightroom collection ID. */
    lightroomRemoveMediaFromCollection?: Maybe<LightroomRemoveMediaFromCollectionResponse>;
    lightroomSyncCatalog?: Maybe<LightroomSyncCatalogResponse>;
    lightroomSyncCollection?: Maybe<LightroomSyncCollectionResponse>;
    lightroomSyncMedia?: Maybe<LightroomSyncMediaResponse>;
    lightroomSyncRendition?: Maybe<LightroomSyncRenditionResponse>;
    register?: Maybe<RegisterPayload>;
    /** Updates a single `Album` using a unique key and a patch. */
    updateAlbum?: Maybe<UpdateAlbumPayload>;
    /** Updates a single `Album` using its globally unique id and a patch. */
    updateAlbumByNodeId?: Maybe<UpdateAlbumPayload>;
    /** Updates a single `AlbumMedia` using a unique key and a patch. */
    updateAlbumMedia?: Maybe<UpdateAlbumMediaPayload>;
    /** Updates a single `AlbumMedia` using its globally unique id and a patch. */
    updateAlbumMediaByNodeId?: Maybe<UpdateAlbumMediaPayload>;
    /** Updates a single `Copyright` using a unique key and a patch. */
    updateCopyright?: Maybe<UpdateCopyrightPayload>;
    /** Updates a single `Copyright` using its globally unique id and a patch. */
    updateCopyrightByNodeId?: Maybe<UpdateCopyrightPayload>;
    /** Updates a single `CryptoKey` using a unique key and a patch. */
    updateCryptoKey?: Maybe<UpdateCryptoKeyPayload>;
    /** Updates a single `CryptoKey` using a unique key and a patch. */
    updateCryptoKeyByCid?: Maybe<UpdateCryptoKeyPayload>;
    /** Updates a single `CryptoKey` using a unique key and a patch. */
    updateCryptoKeyByFingerprint?: Maybe<UpdateCryptoKeyPayload>;
    /** Updates a single `CryptoKey` using a unique key and a patch. */
    updateCryptoKeyByIsPrimaryAndUserId?: Maybe<UpdateCryptoKeyPayload>;
    /** Updates a single `CryptoKey` using its globally unique id and a patch. */
    updateCryptoKeyByNodeId?: Maybe<UpdateCryptoKeyPayload>;
    /** Updates a single `Device` using a unique key and a patch. */
    updateDevice?: Maybe<UpdateDevicePayload>;
    /** Updates a single `Device` using a unique key and a patch. */
    updateDeviceByCid?: Maybe<UpdateDevicePayload>;
    /** Updates a single `Device` using its globally unique id and a patch. */
    updateDeviceByNodeId?: Maybe<UpdateDevicePayload>;
    /** Updates a single `Media` using a unique key and a patch. */
    updateMedia?: Maybe<UpdateMediaPayload>;
    /** Updates a single `Media` using its globally unique id and a patch. */
    updateMediaByNodeId?: Maybe<UpdateMediaPayload>;
    /** Update the media with the created copyright statements */
    updateMediaCopyright?: Maybe<MediaPayload>;
    /** Updates a single `MediaDevice` using a unique key and a patch. */
    updateMediaDeviceByMediaIdAndDeviceId?: Maybe<UpdateMediaDevicePayload>;
    /** Updates a single `Rendition` using a unique key and a patch. */
    updateRendition?: Maybe<UpdateRenditionPayload>;
    /** Updates a single `Rendition` using a unique key and a patch. */
    updateRenditionByCid?: Maybe<UpdateRenditionPayload>;
    /** Updates a single `Rendition` using a unique key and a patch. */
    updateRenditionByMediaIdAndIsMaster?: Maybe<UpdateRenditionPayload>;
    /** Updates a single `Rendition` using its globally unique id and a patch. */
    updateRenditionByNodeId?: Maybe<UpdateRenditionPayload>;
    /** Updates a single `User` using a unique key and a patch. */
    updateUser?: Maybe<UpdateUserPayload>;
    /** Updates a single `User` using its globally unique id and a patch. */
    updateUserByNodeId?: Maybe<UpdateUserPayload>;
    /** Updates a single `User` using a unique key and a patch. */
    updateUserByUsername?: Maybe<UpdateUserPayload>;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationCreateAlbumArgs = {
    input: CreateAlbumInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationCreateAlbumMediaArgs = {
    input: CreateAlbumMediaInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationCreateCopyrightArgs = {
    input: CreateCopyrightInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationCreateDeviceArgs = {
    input: CreateDeviceInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationCreateMediaArgs = {
    input: CreateMediaInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationCreateRenditionArgs = {
    input: CreateRenditionInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationCreateUserEmailArgs = {
    input: CreateUserEmailInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteAlbumArgs = {
    input: DeleteAlbumInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteAlbumByNodeIdArgs = {
    input: DeleteAlbumByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteAlbumMediaArgs = {
    input: DeleteAlbumMediaInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteAlbumMediaByNodeIdArgs = {
    input: DeleteAlbumMediaByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteCopyrightArgs = {
    input: DeleteCopyrightInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteCopyrightByNodeIdArgs = {
    input: DeleteCopyrightByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteDeviceArgs = {
    input: DeleteDeviceInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteDeviceByCidArgs = {
    input: DeleteDeviceByCidInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteDeviceByNodeIdArgs = {
    input: DeleteDeviceByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteMediaArgs = {
    input: DeleteMediaInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteMediaByNodeIdArgs = {
    input: DeleteMediaByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteMediaDeviceByMediaIdAndDeviceIdArgs = {
    input: DeleteMediaDeviceByMediaIdAndDeviceIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteRenditionArgs = {
    input: DeleteRenditionInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteRenditionByCidArgs = {
    input: DeleteRenditionByCidInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteRenditionByMediaIdAndIsMasterArgs = {
    input: DeleteRenditionByMediaIdAndIsMasterInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteRenditionByNodeIdArgs = {
    input: DeleteRenditionByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteUserArgs = {
    input: DeleteUserInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteUserAuthenticationArgs = {
    input: DeleteUserAuthenticationInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteUserAuthenticationByNodeIdArgs = {
    input: DeleteUserAuthenticationByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteUserAuthenticationByServiceAndIdentifierArgs = {
    input: DeleteUserAuthenticationByServiceAndIdentifierInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteUserByNodeIdArgs = {
    input: DeleteUserByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteUserByUsernameArgs = {
    input: DeleteUserByUsernameInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteUserEmailArgs = {
    input: DeleteUserEmailInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteUserEmailByNodeIdArgs = {
    input: DeleteUserEmailByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationDeleteUserEmailByUserIdAndEmailArgs = {
    input: DeleteUserEmailByUserIdAndEmailInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationLightroomRemoveMediaFromCollectionArgs = {
    input: LightroomRemoveMediaFromCollectionInputPayload;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationLightroomSyncCatalogArgs = {
    input: LightroomSyncCatalogInputPayload;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationLightroomSyncCollectionArgs = {
    input: LightroomSyncCollectionInputPayload;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationLightroomSyncMediaArgs = {
    input: LightroomSyncMediaInputPayload;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationLightroomSyncRenditionArgs = {
    rendition: RenditionInput;
    renditionId?: Maybe<Scalars['Int']>;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationRegisterArgs = {
    input: RegisterInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateAlbumArgs = {
    input: UpdateAlbumInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateAlbumByNodeIdArgs = {
    input: UpdateAlbumByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateAlbumMediaArgs = {
    input: UpdateAlbumMediaInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateAlbumMediaByNodeIdArgs = {
    input: UpdateAlbumMediaByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateCopyrightArgs = {
    input: UpdateCopyrightInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateCopyrightByNodeIdArgs = {
    input: UpdateCopyrightByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateCryptoKeyArgs = {
    input: UpdateCryptoKeyInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateCryptoKeyByCidArgs = {
    input: UpdateCryptoKeyByCidInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateCryptoKeyByFingerprintArgs = {
    input: UpdateCryptoKeyByFingerprintInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateCryptoKeyByIsPrimaryAndUserIdArgs = {
    input: UpdateCryptoKeyByIsPrimaryAndUserIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateCryptoKeyByNodeIdArgs = {
    input: UpdateCryptoKeyByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateDeviceArgs = {
    input: UpdateDeviceInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateDeviceByCidArgs = {
    input: UpdateDeviceByCidInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateDeviceByNodeIdArgs = {
    input: UpdateDeviceByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateMediaArgs = {
    input: UpdateMediaInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateMediaByNodeIdArgs = {
    input: UpdateMediaByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateMediaCopyrightArgs = {
    input: Array<MediaCopyright>;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateMediaDeviceByMediaIdAndDeviceIdArgs = {
    input: UpdateMediaDeviceByMediaIdAndDeviceIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateRenditionArgs = {
    input: UpdateRenditionInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateRenditionByCidArgs = {
    input: UpdateRenditionByCidInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateRenditionByMediaIdAndIsMasterArgs = {
    input: UpdateRenditionByMediaIdAndIsMasterInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateRenditionByNodeIdArgs = {
    input: UpdateRenditionByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateUserArgs = {
    input: UpdateUserInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateUserByNodeIdArgs = {
    input: UpdateUserByNodeIdInput;
};
/** The root mutation type which contains root level fields which mutate data. */
export declare type MutationUpdateUserByUsernameArgs = {
    input: UpdateUserByUsernameInput;
};
/** An object with a globally unique `ID`. */
export declare type Node = {
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
};
export declare type Notification = {
    __typename?: 'Notification';
    id: Scalars['String'];
    message: Scalars['String'];
    expiration: Scalars['Int'];
    error: Scalars['Boolean'];
};
/** Information about pagination in a connection. */
export declare type PageInfo = {
    __typename?: 'PageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['Cursor']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['Cursor']>;
};
/** The root query type which gives access points into the data universe. */
export declare type Query = Node & {
    __typename?: 'Query';
    _albumLightroomCollectionByAlbumIdAndCollectionId?: Maybe<_AlbumLightroomCollection>;
    /** Reads and enables pagination through a set of `_AlbumLightroomCollection`. */
    _albumLightroomCollections?: Maybe<_AlbumLightroomCollectionsConnection>;
    album?: Maybe<Album>;
    /** Reads a single `Album` using its globally unique `ID`. */
    albumByNodeId?: Maybe<Album>;
    albumMedia?: Maybe<AlbumMedia>;
    /** Reads a single `AlbumMedia` using its globally unique `ID`. */
    albumMediaByNodeId?: Maybe<AlbumMedia>;
    /** Reads and enables pagination through a set of `AlbumMedia`. */
    albumMedias?: Maybe<AlbumMediaConnection>;
    /** Reads and enables pagination through a set of `Album`. */
    albums?: Maybe<AlbumsConnection>;
    copyright?: Maybe<Copyright>;
    /** Reads a single `Copyright` using its globally unique `ID`. */
    copyrightByNodeId?: Maybe<Copyright>;
    /** Reads and enables pagination through a set of `Copyright`. */
    copyrights?: Maybe<CopyrightsConnection>;
    cryptoKey?: Maybe<CryptoKey>;
    cryptoKeyByCid?: Maybe<CryptoKey>;
    cryptoKeyByFingerprint?: Maybe<CryptoKey>;
    cryptoKeyByIsPrimaryAndUserId?: Maybe<CryptoKey>;
    /** Reads a single `CryptoKey` using its globally unique `ID`. */
    cryptoKeyByNodeId?: Maybe<CryptoKey>;
    /** Reads and enables pagination through a set of `CryptoKey`. */
    cryptoKeys?: Maybe<CryptoKeysConnection>;
    /** The currently logged in user (or null if not logged in). */
    currentUser?: Maybe<User>;
    currentUserId?: Maybe<Scalars['Int']>;
    device?: Maybe<Device>;
    deviceByCid?: Maybe<Device>;
    /** Reads a single `Device` using its globally unique `ID`. */
    deviceByNodeId?: Maybe<Device>;
    /** Reads and enables pagination through a set of `Device`. */
    devices?: Maybe<DevicesConnection>;
    isLoggedIn: Scalars['Boolean'];
    lightroomCatalog?: Maybe<LightroomCatalog>;
    /** Reads a single `LightroomCatalog` using its globally unique `ID`. */
    lightroomCatalogByNodeId?: Maybe<LightroomCatalog>;
    /** Reads and enables pagination through a set of `LightroomCatalog`. */
    lightroomCatalogs?: Maybe<LightroomCatalogsConnection>;
    lightroomCollection?: Maybe<LightroomCollection>;
    lightroomCollectionByCatalogIdAndLocalIdentifier?: Maybe<LightroomCollection>;
    /** Reads a single `LightroomCollection` using its globally unique `ID`. */
    lightroomCollectionByNodeId?: Maybe<LightroomCollection>;
    /** Reads and enables pagination through a set of `LightroomCollection`. */
    lightroomCollections?: Maybe<LightroomCollectionsConnection>;
    lightroomMedia?: Maybe<LightroomMedia>;
    /** Reads a single `LightroomMedia` using its globally unique `ID`. */
    lightroomMediaByNodeId?: Maybe<LightroomMedia>;
    lightroomMediaByUuidIdentifier?: Maybe<LightroomMedia>;
    lightroomMediaUniquenessByLrMediaAndCatalogIdAndCollectionIdAndLocalIdentifier?: Maybe<LightroomMediaUniqueness>;
    /** Reads and enables pagination through a set of `LightroomMediaUniqueness`. */
    lightroomMediaUniquenesses?: Maybe<LightroomMediaUniquenessesConnection>;
    /** Reads and enables pagination through a set of `LightroomMedia`. */
    lightroomMedias?: Maybe<LightroomMediaConnection>;
    me: User;
    media?: Maybe<Media>;
    /** Reads a single `Media` using its globally unique `ID`. */
    mediaByNodeId?: Maybe<Media>;
    mediaDeviceByMediaIdAndDeviceId?: Maybe<MediaDevice>;
    /** Reads and enables pagination through a set of `MediaDevice`. */
    mediaDevices?: Maybe<MediaDevicesConnection>;
    /** Any media that have device ownership verified will be eligible for the copyright claim. */
    mediaReadyForCopyright?: Maybe<MediaConnection>;
    /** Reads and enables pagination through a set of `Media`. */
    medias?: Maybe<MediaConnection>;
    /** Fetches an object given its globally unique `ID`. */
    node?: Maybe<Node>;
    /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
    nodeId: Scalars['ID'];
    notifications?: Maybe<Array<Maybe<Notification>>>;
    /**
     * Exposes the root query type nested one level down. This is helpful for Relay 1
     * which can only query top level fields if they are in a particular form.
     */
    query: Query;
    rendition?: Maybe<Rendition>;
    renditionByCid?: Maybe<Rendition>;
    renditionByMediaIdAndIsMaster?: Maybe<Rendition>;
    /** Reads a single `Rendition` using its globally unique `ID`. */
    renditionByNodeId?: Maybe<Rendition>;
    /** Reads and enables pagination through a set of `Rendition`. */
    renditions?: Maybe<RenditionsConnection>;
    selectedMedia: Array<Scalars['String']>;
    slugify?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
    userAuthentication?: Maybe<UserAuthentication>;
    /** Reads a single `UserAuthentication` using its globally unique `ID`. */
    userAuthenticationByNodeId?: Maybe<UserAuthentication>;
    userAuthenticationByServiceAndIdentifier?: Maybe<UserAuthentication>;
    /** Reads a single `User` using its globally unique `ID`. */
    userByNodeId?: Maybe<User>;
    userByUsername?: Maybe<User>;
    userEmail?: Maybe<UserEmail>;
    /** Reads a single `UserEmail` using its globally unique `ID`. */
    userEmailByNodeId?: Maybe<UserEmail>;
    userEmailByUserIdAndEmail?: Maybe<UserEmail>;
};
/** The root query type which gives access points into the data universe. */
export declare type Query_AlbumLightroomCollectionByAlbumIdAndCollectionIdArgs = {
    albumId: Scalars['Int'];
    collectionId: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type Query_AlbumLightroomCollectionsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<_AlbumLightroomCollectionCondition>;
    filter?: Maybe<_AlbumLightroomCollectionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<_AlbumLightroomCollectionsOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryAlbumArgs = {
    id: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryAlbumByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryAlbumMediaArgs = {
    albumId: Scalars['Int'];
    mediaId: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryAlbumMediaByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryAlbumMediasArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<AlbumMediaCondition>;
    filter?: Maybe<AlbumMediaFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<AlbumMediaOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryAlbumsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<AlbumCondition>;
    filter?: Maybe<AlbumFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<AlbumsOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryCopyrightArgs = {
    id: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryCopyrightByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryCopyrightsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<CopyrightCondition>;
    filter?: Maybe<CopyrightFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<CopyrightsOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryCryptoKeyArgs = {
    id: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryCryptoKeyByCidArgs = {
    cid: Scalars['String'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryCryptoKeyByFingerprintArgs = {
    fingerprint: Scalars['String'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryCryptoKeyByIsPrimaryAndUserIdArgs = {
    isPrimary: Scalars['Boolean'];
    userId: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryCryptoKeyByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryCryptoKeysArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<CryptoKeyCondition>;
    filter?: Maybe<CryptoKeyFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<CryptoKeysOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryDeviceArgs = {
    id: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryDeviceByCidArgs = {
    cid: Scalars['String'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryDeviceByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryDevicesArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<DeviceCondition>;
    filter?: Maybe<DeviceFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<DevicesOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomCatalogArgs = {
    id: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomCatalogByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomCatalogsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCatalogCondition>;
    filter?: Maybe<LightroomCatalogFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCatalogsOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomCollectionArgs = {
    id: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomCollectionByCatalogIdAndLocalIdentifierArgs = {
    catalogId: Scalars['Int'];
    localIdentifier: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomCollectionByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomCollectionsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomCollectionCondition>;
    filter?: Maybe<LightroomCollectionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomCollectionsOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomMediaArgs = {
    id: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomMediaByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomMediaByUuidIdentifierArgs = {
    uuidIdentifier: Scalars['UUID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomMediaUniquenessByLrMediaAndCatalogIdAndCollectionIdAndLocalIdentifierArgs = {
    catalogId: Scalars['Int'];
    collectionId: Scalars['Int'];
    localIdentifier: Scalars['Int'];
    lrMedia: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomMediaUniquenessesArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaUniquenessCondition>;
    filter?: Maybe<LightroomMediaUniquenessFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaUniquenessesOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryLightroomMediasArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<LightroomMediaCondition>;
    filter?: Maybe<LightroomMediaFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<LightroomMediaOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryMediaArgs = {
    id: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryMediaByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryMediaDeviceByMediaIdAndDeviceIdArgs = {
    deviceId: Scalars['Int'];
    mediaId: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryMediaDevicesArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<MediaDeviceCondition>;
    filter?: Maybe<MediaDeviceFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<MediaDevicesOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryMediaReadyForCopyrightArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    filter?: Maybe<MediaFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryMediasArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<MediaCondition>;
    filter?: Maybe<MediaFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<MediaOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QueryNodeArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryRenditionArgs = {
    id: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryRenditionByCidArgs = {
    cid: Scalars['String'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryRenditionByMediaIdAndIsMasterArgs = {
    isMaster: Scalars['Boolean'];
    mediaId: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryRenditionByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryRenditionsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<RenditionCondition>;
    filter?: Maybe<RenditionFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<RenditionsOrderBy>>;
};
/** The root query type which gives access points into the data universe. */
export declare type QuerySlugifyArgs = {
    value: Scalars['String'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryUserArgs = {
    id: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryUserAuthenticationArgs = {
    id: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryUserAuthenticationByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryUserAuthenticationByServiceAndIdentifierArgs = {
    identifier: Scalars['String'];
    service: Scalars['String'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryUserByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryUserByUsernameArgs = {
    username: Scalars['String'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryUserEmailArgs = {
    id: Scalars['Int'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryUserEmailByNodeIdArgs = {
    nodeId: Scalars['ID'];
};
/** The root query type which gives access points into the data universe. */
export declare type QueryUserEmailByUserIdAndEmailArgs = {
    email: Scalars['String'];
    userId: Scalars['Int'];
};
export declare type RegisterInput = {
    authService: AuthServiceInput;
    cryptoKey?: Maybe<CryptoKeySimpleInput>;
    user: SimpleUserInput;
};
export declare type RegisterPayload = {
    __typename?: 'RegisterPayload';
    user: User;
};
/** A version of the Media. It can be a master one or published. Unlocked and Locked. *Unlocked* is considered provate and user can always `develop` the photo. *Locked* is considered a public and published photo, no changes are allowed. */
export declare type Rendition = Node & {
    __typename?: 'Rendition';
    /** Rendition aspect ratio. */
    aspectRatio?: Maybe<Scalars['Float']>;
    /** content address identifier @anagolay/op-an-cid npm package */
    cid: Scalars['String'];
    createdAt: Scalars['Datetime'];
    /** Develop Settings in JSON format */
    developSettings?: Maybe<Scalars['JSON']>;
    /** Format of the file. One of 'RAW', 'DNG', 'JPG', 'PSD', 'TIFF', or 'VIDEO'. */
    fileFormat: Scalars['String'];
    /** synced file name */
    fileName?: Maybe<Scalars['String']>;
    /** File version on the storage if supported. Think of this as a stored revision ID. */
    fileVersion?: Maybe<Scalars['String']>;
    /** Frames per second, if a video, if not then null. */
    fps?: Maybe<Scalars['Float']>;
    /** Height of the rendition. */
    height: Scalars['Int'];
    id: Scalars['Int'];
    /** abs path where to find image rendition on related storage */
    imageStoragePath: Scalars['String'];
    /** Every Media must hava one master rendition. Usually First one is the master. This one is served by default when viewing in the apps. */
    isMaster: Scalars['Boolean'];
    /** It is a  smart preview, mainly for LR. */
    isSmartPreview: Scalars['Boolean'];
    /** Reads a single `Media` that is related to this `Rendition`. */
    media?: Maybe<Media>;
    mediaId: Scalars['Int'];
    /** Rendition metadata */
    metadata?: Maybe<Scalars['JSON']>;
    /** content address of the image METADATA without any modifications. Using the @anagolay/op-an-image-metadata-hash */
    metadataCid?: Maybe<Scalars['String']>;
    /** abs path where to find full metadata of the rendition on related storage */
    metadataStoragePath?: Maybe<Scalars['String']>;
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
    /** content address of the RAW pixels without the metadata. The pixels are as IT IS, no color transformation is included. Using the @anagolay/op-an-image-raw-pixels-hash */
    pixelCid?: Maybe<Scalars['String']>;
    /** What is the size of the rendition in bytes. */
    size?: Maybe<Scalars['Int']>;
    src: Scalars['String'];
    updatedAt: Scalars['Datetime'];
    /** Width of the rendition. */
    width: Scalars['Int'];
};
/**
 * A condition to be used against `Rendition` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export declare type RenditionCondition = {
    /** Checks for equality with the object’s `cid` field. */
    cid?: Maybe<Scalars['String']>;
    /** Checks for equality with the object’s `id` field. */
    id?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `isMaster` field. */
    isMaster?: Maybe<Scalars['Boolean']>;
    /** Checks for equality with the object’s `mediaId` field. */
    mediaId?: Maybe<Scalars['Int']>;
};
/** A filter to be used against `Rendition` object types. All fields are combined with a logical ‘and.’ */
export declare type RenditionFilter = {
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<RenditionFilter>>;
    /** Filter by the object’s `cid` field. */
    cid?: Maybe<StringFilter>;
    /** Filter by the object’s `id` field. */
    id?: Maybe<IntFilter>;
    /** Filter by the object’s `isMaster` field. */
    isMaster?: Maybe<BooleanFilter>;
    /** Filter by the object’s `mediaId` field. */
    mediaId?: Maybe<IntFilter>;
    /** Negates the expression. */
    not?: Maybe<RenditionFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<RenditionFilter>>;
};
/** An input for mutations affecting `Rendition` */
export declare type RenditionInput = {
    /** Rendition aspect ratio. */
    aspectRatio?: Maybe<Scalars['Float']>;
    /** content address identifier @anagolay/op-an-cid npm package */
    cid: Scalars['String'];
    createdAt?: Maybe<Scalars['Datetime']>;
    /** Develop Settings in JSON format */
    developSettings?: Maybe<Scalars['JSON']>;
    /** Format of the file. One of 'RAW', 'DNG', 'JPG', 'PSD', 'TIFF', or 'VIDEO'. */
    fileFormat?: Maybe<Scalars['String']>;
    /** synced file name */
    fileName?: Maybe<Scalars['String']>;
    /** File version on the storage if supported. Think of this as a stored revision ID. */
    fileVersion?: Maybe<Scalars['String']>;
    /** Frames per second, if a video, if not then null. */
    fps?: Maybe<Scalars['Float']>;
    /** Height of the rendition. */
    height: Scalars['Int'];
    /** abs path where to find image rendition on related storage */
    imageStoragePath: Scalars['String'];
    /** Every Media must hava one master rendition. Usually First one is the master. This one is served by default when viewing in the apps. */
    isMaster?: Maybe<Scalars['Boolean']>;
    /** It is a  smart preview, mainly for LR. */
    isSmartPreview?: Maybe<Scalars['Boolean']>;
    mediaId: Scalars['Int'];
    /** Rendition metadata */
    metadata?: Maybe<Scalars['JSON']>;
    /** content address of the image METADATA without any modifications. Using the @anagolay/op-an-image-metadata-hash */
    metadataCid?: Maybe<Scalars['String']>;
    /** abs path where to find full metadata of the rendition on related storage */
    metadataStoragePath?: Maybe<Scalars['String']>;
    /** content address of the RAW pixels without the metadata. The pixels are as IT IS, no color transformation is included. Using the @anagolay/op-an-image-raw-pixels-hash */
    pixelCid?: Maybe<Scalars['String']>;
    /** What is the size of the rendition in bytes. */
    size?: Maybe<Scalars['Int']>;
    updatedAt?: Maybe<Scalars['Datetime']>;
    /** Width of the rendition. */
    width: Scalars['Int'];
};
/** Represents an update to a `Rendition`. Fields that are set will be updated. */
export declare type RenditionPatch = {
    /** Rendition aspect ratio. */
    aspectRatio?: Maybe<Scalars['Float']>;
    /** content address identifier @anagolay/op-an-cid npm package */
    cid?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['Datetime']>;
    /** Develop Settings in JSON format */
    developSettings?: Maybe<Scalars['JSON']>;
    /** Format of the file. One of 'RAW', 'DNG', 'JPG', 'PSD', 'TIFF', or 'VIDEO'. */
    fileFormat?: Maybe<Scalars['String']>;
    /** synced file name */
    fileName?: Maybe<Scalars['String']>;
    /** File version on the storage if supported. Think of this as a stored revision ID. */
    fileVersion?: Maybe<Scalars['String']>;
    /** Frames per second, if a video, if not then null. */
    fps?: Maybe<Scalars['Float']>;
    /** Height of the rendition. */
    height?: Maybe<Scalars['Int']>;
    /** abs path where to find image rendition on related storage */
    imageStoragePath?: Maybe<Scalars['String']>;
    /** Every Media must hava one master rendition. Usually First one is the master. This one is served by default when viewing in the apps. */
    isMaster?: Maybe<Scalars['Boolean']>;
    /** It is a  smart preview, mainly for LR. */
    isSmartPreview?: Maybe<Scalars['Boolean']>;
    mediaId?: Maybe<Scalars['Int']>;
    /** Rendition metadata */
    metadata?: Maybe<Scalars['JSON']>;
    /** content address of the image METADATA without any modifications. Using the @anagolay/op-an-image-metadata-hash */
    metadataCid?: Maybe<Scalars['String']>;
    /** abs path where to find full metadata of the rendition on related storage */
    metadataStoragePath?: Maybe<Scalars['String']>;
    /** content address of the RAW pixels without the metadata. The pixels are as IT IS, no color transformation is included. Using the @anagolay/op-an-image-raw-pixels-hash */
    pixelCid?: Maybe<Scalars['String']>;
    /** What is the size of the rendition in bytes. */
    size?: Maybe<Scalars['Int']>;
    updatedAt?: Maybe<Scalars['Datetime']>;
    /** Width of the rendition. */
    width?: Maybe<Scalars['Int']>;
};
/** A connection to a list of `Rendition` values. */
export declare type RenditionsConnection = {
    __typename?: 'RenditionsConnection';
    /** A list of edges which contains the `Rendition` and cursor to aid in pagination. */
    edges: Array<RenditionsEdge>;
    /** A list of `Rendition` objects. */
    nodes: Array<Rendition>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `Rendition` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `Rendition` edge in the connection. */
export declare type RenditionsEdge = {
    __typename?: 'RenditionsEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `Rendition` at the end of the edge. */
    node: Rendition;
};
/** Methods to use when ordering `Rendition`. */
export declare enum RenditionsOrderBy {
    CidAsc = "CID_ASC",
    CidDesc = "CID_DESC",
    IdAsc = "ID_ASC",
    IdDesc = "ID_DESC",
    IsMasterAsc = "IS_MASTER_ASC",
    IsMasterDesc = "IS_MASTER_DESC",
    MediaIdAsc = "MEDIA_ID_ASC",
    MediaIdDesc = "MEDIA_ID_DESC",
    Natural = "NATURAL",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC"
}
export declare type SimpleUserInput = {
    avatarUrl?: Maybe<Scalars['String']>;
    email: Scalars['String'];
    email_verified?: Maybe<Scalars['Boolean']>;
    name?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
};
/** Key-Value Object style type */
export declare type SnProof = {
    __typename?: 'SnProof';
    id?: Maybe<Scalars['String']>;
    pallet?: Maybe<Scalars['String']>;
};
/** An input for mutations affecting `SnProof` */
export declare type SnProofInput = {
    id?: Maybe<Scalars['String']>;
    pallet?: Maybe<Scalars['String']>;
};
/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export declare type StringFilter = {
    /** Not equal to the specified value, treating null like an ordinary value. */
    distinctFrom?: Maybe<Scalars['String']>;
    /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
    distinctFromInsensitive?: Maybe<Scalars['String']>;
    /** Ends with the specified string (case-sensitive). */
    endsWith?: Maybe<Scalars['String']>;
    /** Ends with the specified string (case-insensitive). */
    endsWithInsensitive?: Maybe<Scalars['String']>;
    /** Equal to the specified value. */
    equalTo?: Maybe<Scalars['String']>;
    /** Equal to the specified value (case-insensitive). */
    equalToInsensitive?: Maybe<Scalars['String']>;
    /** Greater than the specified value. */
    greaterThan?: Maybe<Scalars['String']>;
    /** Greater than the specified value (case-insensitive). */
    greaterThanInsensitive?: Maybe<Scalars['String']>;
    /** Greater than or equal to the specified value. */
    greaterThanOrEqualTo?: Maybe<Scalars['String']>;
    /** Greater than or equal to the specified value (case-insensitive). */
    greaterThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
    /** Included in the specified list. */
    in?: Maybe<Array<Scalars['String']>>;
    /** Contains the specified string (case-sensitive). */
    includes?: Maybe<Scalars['String']>;
    /** Contains the specified string (case-insensitive). */
    includesInsensitive?: Maybe<Scalars['String']>;
    /** Included in the specified list (case-insensitive). */
    inInsensitive?: Maybe<Array<Scalars['String']>>;
    /** Is null (if `true` is specified) or is not null (if `false` is specified). */
    isNull?: Maybe<Scalars['Boolean']>;
    /** Less than the specified value. */
    lessThan?: Maybe<Scalars['String']>;
    /** Less than the specified value (case-insensitive). */
    lessThanInsensitive?: Maybe<Scalars['String']>;
    /** Less than or equal to the specified value. */
    lessThanOrEqualTo?: Maybe<Scalars['String']>;
    /** Less than or equal to the specified value (case-insensitive). */
    lessThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
    /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
    like?: Maybe<Scalars['String']>;
    /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
    likeInsensitive?: Maybe<Scalars['String']>;
    /** Equal to the specified value, treating null like an ordinary value. */
    notDistinctFrom?: Maybe<Scalars['String']>;
    /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
    notDistinctFromInsensitive?: Maybe<Scalars['String']>;
    /** Does not end with the specified string (case-sensitive). */
    notEndsWith?: Maybe<Scalars['String']>;
    /** Does not end with the specified string (case-insensitive). */
    notEndsWithInsensitive?: Maybe<Scalars['String']>;
    /** Not equal to the specified value. */
    notEqualTo?: Maybe<Scalars['String']>;
    /** Not equal to the specified value (case-insensitive). */
    notEqualToInsensitive?: Maybe<Scalars['String']>;
    /** Not included in the specified list. */
    notIn?: Maybe<Array<Scalars['String']>>;
    /** Does not contain the specified string (case-sensitive). */
    notIncludes?: Maybe<Scalars['String']>;
    /** Does not contain the specified string (case-insensitive). */
    notIncludesInsensitive?: Maybe<Scalars['String']>;
    /** Not included in the specified list (case-insensitive). */
    notInInsensitive?: Maybe<Array<Scalars['String']>>;
    /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
    notLike?: Maybe<Scalars['String']>;
    /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
    notLikeInsensitive?: Maybe<Scalars['String']>;
    /** Does not start with the specified string (case-sensitive). */
    notStartsWith?: Maybe<Scalars['String']>;
    /** Does not start with the specified string (case-insensitive). */
    notStartsWithInsensitive?: Maybe<Scalars['String']>;
    /** Starts with the specified string (case-sensitive). */
    startsWith?: Maybe<Scalars['String']>;
    /** Starts with the specified string (case-insensitive). */
    startsWithInsensitive?: Maybe<Scalars['String']>;
};
/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export declare type UuidFilter = {
    /** Not equal to the specified value, treating null like an ordinary value. */
    distinctFrom?: Maybe<Scalars['UUID']>;
    /** Equal to the specified value. */
    equalTo?: Maybe<Scalars['UUID']>;
    /** Greater than the specified value. */
    greaterThan?: Maybe<Scalars['UUID']>;
    /** Greater than or equal to the specified value. */
    greaterThanOrEqualTo?: Maybe<Scalars['UUID']>;
    /** Included in the specified list. */
    in?: Maybe<Array<Scalars['UUID']>>;
    /** Is null (if `true` is specified) or is not null (if `false` is specified). */
    isNull?: Maybe<Scalars['Boolean']>;
    /** Less than the specified value. */
    lessThan?: Maybe<Scalars['UUID']>;
    /** Less than or equal to the specified value. */
    lessThanOrEqualTo?: Maybe<Scalars['UUID']>;
    /** Equal to the specified value, treating null like an ordinary value. */
    notDistinctFrom?: Maybe<Scalars['UUID']>;
    /** Not equal to the specified value. */
    notEqualTo?: Maybe<Scalars['UUID']>;
    /** Not included in the specified list. */
    notIn?: Maybe<Array<Scalars['UUID']>>;
};
/** All input for the `updateAlbumByNodeId` mutation. */
export declare type UpdateAlbumByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `Album` to be updated. */
    nodeId: Scalars['ID'];
    /** An object where the defined keys will be set on the `Album` being updated. */
    patch: AlbumPatch;
};
/** All input for the `updateAlbum` mutation. */
export declare type UpdateAlbumInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    /** An object where the defined keys will be set on the `Album` being updated. */
    patch: AlbumPatch;
};
/** All input for the `updateAlbumMediaByNodeId` mutation. */
export declare type UpdateAlbumMediaByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `AlbumMedia` to be updated. */
    nodeId: Scalars['ID'];
    /** An object where the defined keys will be set on the `AlbumMedia` being updated. */
    patch: AlbumMediaPatch;
};
/** All input for the `updateAlbumMedia` mutation. */
export declare type UpdateAlbumMediaInput = {
    albumId: Scalars['Int'];
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    mediaId: Scalars['Int'];
    /** An object where the defined keys will be set on the `AlbumMedia` being updated. */
    patch: AlbumMediaPatch;
};
/** The output of our update `AlbumMedia` mutation. */
export declare type UpdateAlbumMediaPayload = {
    __typename?: 'UpdateAlbumMediaPayload';
    /** Reads a single `Album` that is related to this `AlbumMedia`. */
    album?: Maybe<Album>;
    /** The `AlbumMedia` that was updated by this mutation. */
    albumMedia?: Maybe<AlbumMedia>;
    /** An edge for our `AlbumMedia`. May be used by Relay 1. */
    albumMediaEdge?: Maybe<AlbumMediaEdge>;
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Reads a single `Media` that is related to this `AlbumMedia`. */
    media?: Maybe<Media>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our update `AlbumMedia` mutation. */
export declare type UpdateAlbumMediaPayloadAlbumMediaEdgeArgs = {
    orderBy?: Maybe<Array<AlbumMediaOrderBy>>;
};
/** The output of our update `Album` mutation. */
export declare type UpdateAlbumPayload = {
    __typename?: 'UpdateAlbumPayload';
    /** The `Album` that was updated by this mutation. */
    album?: Maybe<Album>;
    /** An edge for our `Album`. May be used by Relay 1. */
    albumEdge?: Maybe<AlbumsEdge>;
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our update `Album` mutation. */
export declare type UpdateAlbumPayloadAlbumEdgeArgs = {
    orderBy?: Maybe<Array<AlbumsOrderBy>>;
};
/** All input for the `updateCopyrightByNodeId` mutation. */
export declare type UpdateCopyrightByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `Copyright` to be updated. */
    nodeId: Scalars['ID'];
    /** An object where the defined keys will be set on the `Copyright` being updated. */
    patch: CopyrightPatch;
};
/** All input for the `updateCopyright` mutation. */
export declare type UpdateCopyrightInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    /** An object where the defined keys will be set on the `Copyright` being updated. */
    patch: CopyrightPatch;
};
/** The output of our update `Copyright` mutation. */
export declare type UpdateCopyrightPayload = {
    __typename?: 'UpdateCopyrightPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The `Copyright` that was updated by this mutation. */
    copyright?: Maybe<Copyright>;
    /** An edge for our `Copyright`. May be used by Relay 1. */
    copyrightEdge?: Maybe<CopyrightsEdge>;
    /** Reads a single `Media` that is related to this `Copyright`. */
    media?: Maybe<Media>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our update `Copyright` mutation. */
export declare type UpdateCopyrightPayloadCopyrightEdgeArgs = {
    orderBy?: Maybe<Array<CopyrightsOrderBy>>;
};
/** All input for the `updateCryptoKeyByCid` mutation. */
export declare type UpdateCryptoKeyByCidInput = {
    /** content address identifier @anagolay/op-an-cid */
    cid: Scalars['String'];
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** An object where the defined keys will be set on the `CryptoKey` being updated. */
    patch: CryptoKeyPatch;
};
/** All input for the `updateCryptoKeyByFingerprint` mutation. */
export declare type UpdateCryptoKeyByFingerprintInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /**
     * unique key indentifier. more info -> https://tools.ietf.org/html/rfc4880#section-12.2
     * hex encoding
     */
    fingerprint: Scalars['String'];
    /** An object where the defined keys will be set on the `CryptoKey` being updated. */
    patch: CryptoKeyPatch;
};
/** All input for the `updateCryptoKeyByIsPrimaryAndUserId` mutation. */
export declare type UpdateCryptoKeyByIsPrimaryAndUserIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** primary key to be used for the operations */
    isPrimary: Scalars['Boolean'];
    /** An object where the defined keys will be set on the `CryptoKey` being updated. */
    patch: CryptoKeyPatch;
    userId: Scalars['Int'];
};
/** All input for the `updateCryptoKeyByNodeId` mutation. */
export declare type UpdateCryptoKeyByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `CryptoKey` to be updated. */
    nodeId: Scalars['ID'];
    /** An object where the defined keys will be set on the `CryptoKey` being updated. */
    patch: CryptoKeyPatch;
};
/** All input for the `updateCryptoKey` mutation. */
export declare type UpdateCryptoKeyInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    /** An object where the defined keys will be set on the `CryptoKey` being updated. */
    patch: CryptoKeyPatch;
};
/** The output of our update `CryptoKey` mutation. */
export declare type UpdateCryptoKeyPayload = {
    __typename?: 'UpdateCryptoKeyPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The `CryptoKey` that was updated by this mutation. */
    cryptoKey?: Maybe<CryptoKey>;
    /** An edge for our `CryptoKey`. May be used by Relay 1. */
    cryptoKeyEdge?: Maybe<CryptoKeysEdge>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
    /** Reads a single `User` that is related to this `CryptoKey`. */
    user?: Maybe<User>;
};
/** The output of our update `CryptoKey` mutation. */
export declare type UpdateCryptoKeyPayloadCryptoKeyEdgeArgs = {
    orderBy?: Maybe<Array<CryptoKeysOrderBy>>;
};
/** All input for the `updateDeviceByCid` mutation. */
export declare type UpdateDeviceByCidInput = {
    /** Content identifier of the device identifiers. Using `@anagolay/op-an-cid(identifiers)`. */
    cid: Scalars['String'];
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** An object where the defined keys will be set on the `Device` being updated. */
    patch: DevicePatch;
};
/** All input for the `updateDeviceByNodeId` mutation. */
export declare type UpdateDeviceByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `Device` to be updated. */
    nodeId: Scalars['ID'];
    /** An object where the defined keys will be set on the `Device` being updated. */
    patch: DevicePatch;
};
/** All input for the `updateDevice` mutation. */
export declare type UpdateDeviceInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    /** An object where the defined keys will be set on the `Device` being updated. */
    patch: DevicePatch;
};
/** The output of our update `Device` mutation. */
export declare type UpdateDevicePayload = {
    __typename?: 'UpdateDevicePayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The `Device` that was updated by this mutation. */
    device?: Maybe<Device>;
    /** An edge for our `Device`. May be used by Relay 1. */
    deviceEdge?: Maybe<DevicesEdge>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our update `Device` mutation. */
export declare type UpdateDevicePayloadDeviceEdgeArgs = {
    orderBy?: Maybe<Array<DevicesOrderBy>>;
};
/** All input for the `updateMediaByNodeId` mutation. */
export declare type UpdateMediaByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `Media` to be updated. */
    nodeId: Scalars['ID'];
    /** An object where the defined keys will be set on the `Media` being updated. */
    patch: MediaPatch;
};
/** All input for the `updateMediaDeviceByMediaIdAndDeviceId` mutation. */
export declare type UpdateMediaDeviceByMediaIdAndDeviceIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    deviceId: Scalars['Int'];
    mediaId: Scalars['Int'];
    /** An object where the defined keys will be set on the `MediaDevice` being updated. */
    patch: MediaDevicePatch;
};
/** The output of our update `MediaDevice` mutation. */
export declare type UpdateMediaDevicePayload = {
    __typename?: 'UpdateMediaDevicePayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Reads a single `Device` that is related to this `MediaDevice`. */
    device?: Maybe<Device>;
    /** Reads a single `Media` that is related to this `MediaDevice`. */
    media?: Maybe<Media>;
    /** The `MediaDevice` that was updated by this mutation. */
    mediaDevice?: Maybe<MediaDevice>;
    /** An edge for our `MediaDevice`. May be used by Relay 1. */
    mediaDeviceEdge?: Maybe<MediaDevicesEdge>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our update `MediaDevice` mutation. */
export declare type UpdateMediaDevicePayloadMediaDeviceEdgeArgs = {
    orderBy?: Maybe<Array<MediaDevicesOrderBy>>;
};
/** All input for the `updateMedia` mutation. */
export declare type UpdateMediaInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    /** An object where the defined keys will be set on the `Media` being updated. */
    patch: MediaPatch;
};
/** The output of our update `Media` mutation. */
export declare type UpdateMediaPayload = {
    __typename?: 'UpdateMediaPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Reads a single `Media` that is related to this `Media`. */
    masterMedia?: Maybe<Media>;
    /** The `Media` that was updated by this mutation. */
    media?: Maybe<Media>;
    /** An edge for our `Media`. May be used by Relay 1. */
    mediaEdge?: Maybe<MediaEdge>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
};
/** The output of our update `Media` mutation. */
export declare type UpdateMediaPayloadMediaEdgeArgs = {
    orderBy?: Maybe<Array<MediaOrderBy>>;
};
/** All input for the `updateRenditionByCid` mutation. */
export declare type UpdateRenditionByCidInput = {
    /** content address identifier @anagolay/op-an-cid npm package */
    cid: Scalars['String'];
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** An object where the defined keys will be set on the `Rendition` being updated. */
    patch: RenditionPatch;
};
/** All input for the `updateRenditionByMediaIdAndIsMaster` mutation. */
export declare type UpdateRenditionByMediaIdAndIsMasterInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Every Media must hava one master rendition. Usually First one is the master. This one is served by default when viewing in the apps. */
    isMaster: Scalars['Boolean'];
    mediaId: Scalars['Int'];
    /** An object where the defined keys will be set on the `Rendition` being updated. */
    patch: RenditionPatch;
};
/** All input for the `updateRenditionByNodeId` mutation. */
export declare type UpdateRenditionByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `Rendition` to be updated. */
    nodeId: Scalars['ID'];
    /** An object where the defined keys will be set on the `Rendition` being updated. */
    patch: RenditionPatch;
};
/** All input for the `updateRendition` mutation. */
export declare type UpdateRenditionInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    /** An object where the defined keys will be set on the `Rendition` being updated. */
    patch: RenditionPatch;
};
/** The output of our update `Rendition` mutation. */
export declare type UpdateRenditionPayload = {
    __typename?: 'UpdateRenditionPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Reads a single `Media` that is related to this `Rendition`. */
    media?: Maybe<Media>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
    /** The `Rendition` that was updated by this mutation. */
    rendition?: Maybe<Rendition>;
    /** An edge for our `Rendition`. May be used by Relay 1. */
    renditionEdge?: Maybe<RenditionsEdge>;
};
/** The output of our update `Rendition` mutation. */
export declare type UpdateRenditionPayloadRenditionEdgeArgs = {
    orderBy?: Maybe<Array<RenditionsOrderBy>>;
};
/** All input for the `updateUserByNodeId` mutation. */
export declare type UpdateUserByNodeIdInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** The globally unique `ID` which will identify a single `User` to be updated. */
    nodeId: Scalars['ID'];
    /** An object where the defined keys will be set on the `User` being updated. */
    patch: UserPatch;
};
/** All input for the `updateUserByUsername` mutation. */
export declare type UpdateUserByUsernameInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** An object where the defined keys will be set on the `User` being updated. */
    patch: UserPatch;
    /** Public-facing username (or 'handle') of the user. */
    username: Scalars['String'];
};
/** All input for the `updateUser` mutation. */
export declare type UpdateUserInput = {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the
     * payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    /** An object where the defined keys will be set on the `User` being updated. */
    patch: UserPatch;
};
/** The output of our update `User` mutation. */
export declare type UpdateUserPayload = {
    __typename?: 'UpdateUserPayload';
    /**
     * The exact same `clientMutationId` that was provided in the mutation input,
     * unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId?: Maybe<Scalars['String']>;
    /** Our root query field type. Allows us to run any query from our mutation payload. */
    query?: Maybe<Query>;
    /** The `User` that was updated by this mutation. */
    user?: Maybe<User>;
    /** An edge for our `User`. May be used by Relay 1. */
    userEdge?: Maybe<UsersEdge>;
};
/** The output of our update `User` mutation. */
export declare type UpdateUserPayloadUserEdgeArgs = {
    orderBy?: Maybe<Array<UsersOrderBy>>;
};
/** A user who can log in to the application. */
export declare type User = Node & {
    __typename?: 'User';
    /** Optional avatar URL. */
    avatarUrl?: Maybe<Scalars['String']>;
    createdAt: Scalars['Datetime'];
    /** Reads and enables pagination through a set of `CryptoKey`. */
    cryptoKeys: CryptoKeysConnection;
    familyName?: Maybe<Scalars['String']>;
    /** Given or first name */
    givenName?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    /** If true, the user has elevated privileges. */
    isAdmin: Scalars['Boolean'];
    /** Public-facing name (or pseudonym) of the user. */
    name?: Maybe<Scalars['String']>;
    nickname?: Maybe<Scalars['String']>;
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
    updatedAt: Scalars['Datetime'];
    /** Reads and enables pagination through a set of `UserEmail`. */
    userEmails: UserEmailsConnection;
    /** Public-facing username (or 'handle') of the user. */
    username: Scalars['String'];
};
/** A user who can log in to the application. */
export declare type UserCryptoKeysArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<CryptoKeyCondition>;
    filter?: Maybe<CryptoKeyFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<CryptoKeysOrderBy>>;
};
/** A user who can log in to the application. */
export declare type UserUserEmailsArgs = {
    after?: Maybe<Scalars['Cursor']>;
    before?: Maybe<Scalars['Cursor']>;
    condition?: Maybe<UserEmailCondition>;
    filter?: Maybe<UserEmailFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Array<UserEmailsOrderBy>>;
};
/** Contains information about the login providers this user has used, so that they may disconnect them should they wish. */
export declare type UserAuthentication = Node & {
    __typename?: 'UserAuthentication';
    createdAt: Scalars['Datetime'];
    id: Scalars['Int'];
    /** A unique identifier for the user within the login service. */
    identifier: Scalars['String'];
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
    /** The login service used, e.g. `google`,`auth0` */
    service: Scalars['String'];
    updatedAt: Scalars['Datetime'];
};
/** A `UserAuthentication` edge in the connection. */
export declare type UserAuthenticationsEdge = {
    __typename?: 'UserAuthenticationsEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `UserAuthentication` at the end of the edge. */
    node: UserAuthentication;
};
/** Methods to use when ordering `UserAuthentication`. */
export declare enum UserAuthenticationsOrderBy {
    IdAsc = "ID_ASC",
    IdDesc = "ID_DESC",
    Natural = "NATURAL",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC",
    ServiceAsc = "SERVICE_ASC",
    ServiceDesc = "SERVICE_DESC"
}
/** Information about a user's email address. */
export declare type UserEmail = Node & {
    __typename?: 'UserEmail';
    createdAt: Scalars['Datetime'];
    /** The users email address, in `a@b.c` format. */
    email: Scalars['String'];
    id: Scalars['Int'];
    /** is this users primary email */
    isPrimary?: Maybe<Scalars['Boolean']>;
    /** True if the user has is_verified their email address (by clicking the link in the email we sent them, or logging in with a social login provider), false otherwise. */
    isVerified: Scalars['Boolean'];
    /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
    nodeId: Scalars['ID'];
    updatedAt: Scalars['Datetime'];
    /** Reads a single `User` that is related to this `UserEmail`. */
    user?: Maybe<User>;
    userId: Scalars['Int'];
};
/**
 * A condition to be used against `UserEmail` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export declare type UserEmailCondition = {
    /** Checks for equality with the object’s `id` field. */
    id?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `isPrimary` field. */
    isPrimary?: Maybe<Scalars['Boolean']>;
    /** Checks for equality with the object’s `userId` field. */
    userId?: Maybe<Scalars['Int']>;
};
/** A filter to be used against `UserEmail` object types. All fields are combined with a logical ‘and.’ */
export declare type UserEmailFilter = {
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<UserEmailFilter>>;
    /** Filter by the object’s `id` field. */
    id?: Maybe<IntFilter>;
    /** Filter by the object’s `isPrimary` field. */
    isPrimary?: Maybe<BooleanFilter>;
    /** Negates the expression. */
    not?: Maybe<UserEmailFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<UserEmailFilter>>;
    /** Filter by the object’s `userId` field. */
    userId?: Maybe<IntFilter>;
};
/** An input for mutations affecting `UserEmail` */
export declare type UserEmailInput = {
    /** The users email address, in `a@b.c` format. */
    email: Scalars['String'];
};
/** A connection to a list of `UserEmail` values. */
export declare type UserEmailsConnection = {
    __typename?: 'UserEmailsConnection';
    /** A list of edges which contains the `UserEmail` and cursor to aid in pagination. */
    edges: Array<UserEmailsEdge>;
    /** A list of `UserEmail` objects. */
    nodes: Array<UserEmail>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `UserEmail` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `UserEmail` edge in the connection. */
export declare type UserEmailsEdge = {
    __typename?: 'UserEmailsEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `UserEmail` at the end of the edge. */
    node: UserEmail;
};
/** Methods to use when ordering `UserEmail`. */
export declare enum UserEmailsOrderBy {
    IdAsc = "ID_ASC",
    IdDesc = "ID_DESC",
    IsPrimaryAsc = "IS_PRIMARY_ASC",
    IsPrimaryDesc = "IS_PRIMARY_DESC",
    Natural = "NATURAL",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC",
    UserIdAsc = "USER_ID_ASC",
    UserIdDesc = "USER_ID_DESC"
}
/** Represents an update to a `User`. Fields that are set will be updated. */
export declare type UserPatch = {
    /** Optional avatar URL. */
    avatarUrl?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['Datetime']>;
    familyName?: Maybe<Scalars['String']>;
    /** Given or first name */
    givenName?: Maybe<Scalars['String']>;
    /** If true, the user has elevated privileges. */
    isAdmin?: Maybe<Scalars['Boolean']>;
    /** Public-facing name (or pseudonym) of the user. */
    name?: Maybe<Scalars['String']>;
    nickname?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['Datetime']>;
    /** Public-facing username (or 'handle') of the user. */
    username?: Maybe<Scalars['String']>;
};
/** A `User` edge in the connection. */
export declare type UsersEdge = {
    __typename?: 'UsersEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `User` at the end of the edge. */
    node: User;
};
/** Methods to use when ordering `User`. */
export declare enum UsersOrderBy {
    IdAsc = "ID_ASC",
    IdDesc = "ID_DESC",
    Natural = "NATURAL",
    PrimaryKeyAsc = "PRIMARY_KEY_ASC",
    PrimaryKeyDesc = "PRIMARY_KEY_DESC",
    UsernameAsc = "USERNAME_ASC",
    UsernameDesc = "USERNAME_DESC"
}
/** Mapping table for the album and Lightroom Collection. This allows us to disconnect the Album and make connections to other service providers. */
export declare type _AlbumLightroomCollection = {
    __typename?: '_AlbumLightroomCollection';
    /** Reads a single `Album` that is related to this `_AlbumLightroomCollection`. */
    album?: Maybe<Album>;
    /** Album ID. */
    albumId: Scalars['Int'];
    /** Reads a single `LightroomCollection` that is related to this `_AlbumLightroomCollection`. */
    collection?: Maybe<LightroomCollection>;
    /** Lightroom Collection ID. */
    collectionId: Scalars['Int'];
};
/**
 * A condition to be used against `_AlbumLightroomCollection` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export declare type _AlbumLightroomCollectionCondition = {
    /** Checks for equality with the object’s `albumId` field. */
    albumId?: Maybe<Scalars['Int']>;
    /** Checks for equality with the object’s `collectionId` field. */
    collectionId?: Maybe<Scalars['Int']>;
};
/** A filter to be used against `_AlbumLightroomCollection` object types. All fields are combined with a logical ‘and.’ */
export declare type _AlbumLightroomCollectionFilter = {
    /** Filter by the object’s `albumId` field. */
    albumId?: Maybe<IntFilter>;
    /** Checks for all expressions in this list. */
    and?: Maybe<Array<_AlbumLightroomCollectionFilter>>;
    /** Filter by the object’s `collectionId` field. */
    collectionId?: Maybe<IntFilter>;
    /** Negates the expression. */
    not?: Maybe<_AlbumLightroomCollectionFilter>;
    /** Checks for any expressions in this list. */
    or?: Maybe<Array<_AlbumLightroomCollectionFilter>>;
};
/** A connection to a list of `_AlbumLightroomCollection` values. */
export declare type _AlbumLightroomCollectionsConnection = {
    __typename?: '_AlbumLightroomCollectionsConnection';
    /** A list of edges which contains the `_AlbumLightroomCollection` and cursor to aid in pagination. */
    edges: Array<_AlbumLightroomCollectionsEdge>;
    /** A list of `_AlbumLightroomCollection` objects. */
    nodes: Array<_AlbumLightroomCollection>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** The count of *all* `_AlbumLightroomCollection` you could get from the connection. */
    totalCount: Scalars['Int'];
};
/** A `_AlbumLightroomCollection` edge in the connection. */
export declare type _AlbumLightroomCollectionsEdge = {
    __typename?: '_AlbumLightroomCollectionsEdge';
    /** A cursor for use in pagination. */
    cursor?: Maybe<Scalars['Cursor']>;
    /** The `_AlbumLightroomCollection` at the end of the edge. */
    node: _AlbumLightroomCollection;
};
/** Methods to use when ordering `_AlbumLightroomCollection`. */
export declare enum _AlbumLightroomCollectionsOrderBy {
    AlbumIdAsc = "ALBUM_ID_ASC",
    AlbumIdDesc = "ALBUM_ID_DESC",
    CollectionIdAsc = "COLLECTION_ID_ASC",
    CollectionIdDesc = "COLLECTION_ID_DESC",
    Natural = "NATURAL"
}
export declare type BasicAlbumInfoFragmentFragment = ({
    __typename?: 'Album';
} & Pick<Album, 'nodeId' | 'id' | 'title'>);
export declare type ExtendedAlbumInfoFragmentFragment = ({
    __typename?: 'Album';
} & Pick<Album, 'nodeId' | 'id' | 'cid' | 'slug' | 'title' | 'description' | 'isPrivate' | 'isSmart' | 'smartRules' | 'metadata' | 'createdAt' | 'updatedAt'>);
export declare type GetAlbumsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetAlbumsQuery = ({
    __typename?: 'Query';
} & {
    albums?: Maybe<({
        __typename?: 'AlbumsConnection';
    } & {
        nodes: Array<({
            __typename?: 'Album';
        } & {
            media: ({
                __typename?: 'AlbumMediaManyToManyConnection';
            } & {
                nodes: Array<({
                    __typename?: 'Media';
                } & BasicMediaInfoFragmentWithMasterRenditionFragment)>;
            });
        } & BasicAlbumInfoFragmentFragment)>;
    })>;
});
export declare type GetAlbumDetailsQueryVariables = Exact<{
    id: Scalars['Int'];
}>;
export declare type GetAlbumDetailsQuery = ({
    __typename?: 'Query';
} & {
    album?: Maybe<({
        __typename?: 'Album';
    } & {
        media: ({
            __typename?: 'AlbumMediaManyToManyConnection';
        } & {
            nodes: Array<({
                __typename?: 'Media';
            } & BasicMediaInfoFragmentWithMasterRenditionFragment)>;
        });
    } & ExtendedAlbumInfoFragmentFragment)>;
});
export declare type UpdateMediaCopyrightMutationVariables = Exact<{
    input: Array<MediaCopyright> | MediaCopyright;
}>;
export declare type UpdateMediaCopyrightMutation = ({
    __typename?: 'Mutation';
} & {
    updateMediaCopyright?: Maybe<({
        __typename?: 'MediaPayload';
    } & Pick<MediaPayload, 'success' | 'inserted' | 'passed'>)>;
});
export declare type CryptoKeyBasicFragmentFragment = ({
    __typename?: 'CryptoKey';
} & Pick<CryptoKey, 'nodeId' | 'id' | 'cid' | 'isPrimary' | 'publicKey' | 'privateKey' | 'keyId' | 'name' | 'slug' | 'implementation'>);
export declare type CryptoKeyExtendedFragmentFragment = ({
    __typename?: 'CryptoKey';
} & Pick<CryptoKey, 'algorithm' | 'creationTime' | 'curve' | 'expirationTime' | 'fingerprint' | 'createdAt' | 'updatedAt'>);
export declare type GetMyCryptoKeysBasicQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetMyCryptoKeysBasicQuery = ({
    __typename?: 'Query';
} & {
    cryptoKeys?: Maybe<({
        __typename?: 'CryptoKeysConnection';
    } & Pick<CryptoKeysConnection, 'totalCount'> & {
        nodes: Array<({
            __typename?: 'CryptoKey';
        } & CryptoKeyBasicFragmentFragment)>;
    })>;
});
export declare type GetMyCryptoKeysExtendedQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetMyCryptoKeysExtendedQuery = ({
    __typename?: 'Query';
} & {
    cryptoKeys?: Maybe<({
        __typename?: 'CryptoKeysConnection';
    } & Pick<CryptoKeysConnection, 'totalCount'> & {
        nodes: Array<({
            __typename?: 'CryptoKey';
        } & CryptoKeyBasicFragmentFragment & CryptoKeyExtendedFragmentFragment)>;
    })>;
});
export declare type BasicDeviceInfoFragment = ({
    __typename?: 'Device';
} & Pick<Device, 'id' | 'nodeId' | 'cid'>);
export declare type FullDeviceInfoFragment = ({
    __typename?: 'Device';
} & Pick<Device, 'identifiers' | 'deviceType' | 'createdAt' | 'maker' | 'model' | 'name' | 'ownershipVerified' | 'ownershipCreatedAt' | 'poeId'> & {
    ownership?: Maybe<Array<Maybe<({
        __typename?: 'SnProof';
    } & Pick<SnProof, 'id' | 'pallet'>)>>>;
} & BasicDeviceInfoFragment);
export declare type MyDevicesQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type MyDevicesQuery = ({
    __typename?: 'Query';
} & {
    devices?: Maybe<({
        __typename?: 'DevicesConnection';
    } & Pick<DevicesConnection, 'totalCount'> & {
        nodes: Array<({
            __typename?: 'Device';
        } & FullDeviceInfoFragment)>;
    })>;
});
export declare type PoCloForVerificationQueryVariables = Exact<{
    ids?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;
export declare type PoCloForVerificationQuery = ({
    __typename?: 'Query';
} & {
    devices?: Maybe<({
        __typename?: 'DevicesConnection';
    } & Pick<DevicesConnection, 'totalCount'> & {
        nodes: Array<({
            __typename?: 'Device';
        } & FullDeviceInfoFragment)>;
    })>;
});
export declare type AddOwnershipToDevicesMutationVariables = Exact<{
    cid: Scalars['String'];
    statementId: Scalars['String'];
    pallet: Scalars['String'];
    verified: Scalars['Boolean'];
    createdAt: Scalars['Datetime'];
}>;
export declare type AddOwnershipToDevicesMutation = ({
    __typename?: 'Mutation';
} & {
    updateDeviceByCid?: Maybe<({
        __typename?: 'UpdateDevicePayload';
    } & Pick<UpdateDevicePayload, 'clientMutationId'> & {
        device?: Maybe<({
            __typename?: 'Device';
        } & FullDeviceInfoFragment)>;
    })>;
});
export declare type IsLoggedInQueryQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type IsLoggedInQueryQuery = ({
    __typename?: 'Query';
} & Pick<Query, 'isLoggedIn'>);
export declare type ActiveNotificationQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type ActiveNotificationQuery = ({
    __typename?: 'Query';
} & {
    notifications?: Maybe<Array<Maybe<({
        __typename?: 'Notification';
    } & Pick<Notification, 'id' | 'message' | 'expiration' | 'error'>)>>>;
});
export declare type PageInfoFragmentFragment = ({
    __typename?: 'PageInfo';
} & Pick<PageInfo, 'endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor'>);
export declare type SelectedMediaQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type SelectedMediaQuery = ({
    __typename?: 'Query';
} & Pick<Query, 'selectedMedia'>);
export declare type MediaPreviewQueryVariables = Exact<{
    id: Scalars['Int'];
}>;
export declare type MediaPreviewQuery = ({
    __typename?: 'Query';
} & {
    media?: Maybe<({
        __typename?: 'Media';
    } & Pick<Media, 'aperture' | 'focalLength' | 'shutterSpeed' | 'didFlashFired' | 'exposureTime' | 'exposureBias' | 'exposureProgram' | 'meteringMode' | 'isoSpeedRating' | 'gps' | 'keywords' | 'isVideo' | 'dateCreated'> & {
        devices: ({
            __typename?: 'MediaDevicesManyToManyConnection';
        } & {
            nodes: Array<({
                __typename?: 'Device';
            } & Pick<Device, 'nodeId' | 'id' | 'cid' | 'deviceType' | 'identifiers' | 'maker' | 'model' | 'name'>)>;
        });
        albums: ({
            __typename?: 'MediaAlbumsManyToManyConnection';
        } & {
            nodes: Array<({
                __typename?: 'Album';
            } & Pick<Album, 'nodeId' | 'id' | 'cid' | 'description' | 'slug' | 'title'>)>;
        });
        renditions: ({
            __typename?: 'RenditionsConnection';
        } & {
            nodes: Array<({
                __typename?: 'Rendition';
            } & Pick<Rendition, 'nodeId' | 'id' | 'size' | 'fileFormat'> & MasterRenditionFragmentFragment)>;
        });
    } & BasicMediaInfoFragmentFragment)>;
});
export declare type MediaKeywordsQueryVariables = Exact<{
    id: Scalars['Int'];
}>;
export declare type MediaKeywordsQuery = ({
    __typename?: 'Query';
} & {
    media?: Maybe<({
        __typename?: 'Media';
    } & Pick<Media, 'keywords'>)>;
});
export declare type MediaCopyrightsQueryVariables = Exact<{
    id: Scalars['Int'];
}>;
export declare type MediaCopyrightsQuery = ({
    __typename?: 'Query';
} & {
    media?: Maybe<({
        __typename?: 'Media';
    } & Pick<Media, 'id' | 'nodeId'> & {
        copyrights: ({
            __typename?: 'CopyrightsConnection';
        } & Pick<CopyrightsConnection, 'totalCount'> & {
            nodes: Array<({
                __typename?: 'Copyright';
            } & Pick<Copyright, 'nodeId' | 'id' | 'statementId' | 'signer'>)>;
        });
    })>;
});
export declare type BasicMediaInfoFragmentFragment = ({
    __typename?: 'Media';
} & Pick<Media, 'nodeId' | 'id' | 'title' | 'headline' | 'caption'>);
export declare type BasicMediaInfoFragmentWithMasterRenditionFragment = ({
    __typename?: 'Media';
} & {
    renditions: ({
        __typename?: 'RenditionsConnection';
    } & {
        nodes: Array<({
            __typename?: 'Rendition';
        } & MasterRenditionFragmentFragment)>;
    });
} & BasicMediaInfoFragmentFragment);
export declare type MediaReadyForCopyrightQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type MediaReadyForCopyrightQuery = ({
    __typename?: 'Query';
} & {
    mediaReadyForCopyright?: Maybe<({
        __typename?: 'MediaConnection';
    } & Pick<MediaConnection, 'totalCount'> & {
        nodes: Array<({
            __typename?: 'Media';
        } & Pick<Media, 'nodeId' | 'id' | 'poeId'> & {
            renditions: ({
                __typename?: 'RenditionsConnection';
            } & {
                nodes: Array<({
                    __typename?: 'Rendition';
                } & Pick<Rendition, 'cid' | 'src'>)>;
            });
        })>;
    })>;
});
export declare type MasterRenditionFragmentFragment = ({
    __typename?: 'Rendition';
} & Pick<Rendition, 'cid' | 'imageStoragePath' | 'src' | 'width' | 'height' | 'isMaster' | 'aspectRatio'>);
export declare type CreateRenditionMutationVariables = Exact<{
    cid: Scalars['String'];
    pixelCid: Scalars['String'];
    metadataCid: Scalars['String'];
    height: Scalars['Int'];
    width: Scalars['Int'];
    imageStoragePath: Scalars['String'];
    metadataStoragePath: Scalars['String'];
    isMaster?: Maybe<Scalars['Boolean']>;
    fileFormat?: Maybe<Scalars['String']>;
    mediaId: Scalars['Int'];
}>;
export declare type CreateRenditionMutation = ({
    __typename: 'Mutation';
} & {
    createRendition?: Maybe<({
        __typename?: 'CreateRenditionPayload';
    } & {
        rendition?: Maybe<({
            __typename?: 'Rendition';
        } & Pick<Rendition, 'id' | 'cid'>)>;
    })>;
});
export declare type GetRenditionByCidQueryVariables = Exact<{
    cid: Scalars['String'];
}>;
export declare type GetRenditionByCidQuery = ({
    __typename?: 'Query';
} & {
    renditionByCid?: Maybe<({
        __typename?: 'Rendition';
    } & Pick<Rendition, 'nodeId' | 'id' | 'mediaId'> & MasterRenditionFragmentFragment)>;
});
export declare type TimelineMediaQueryVariables = Exact<{
    first: Scalars['Int'];
    after?: Maybe<Scalars['Cursor']>;
}>;
export declare type TimelineMediaQuery = ({
    __typename?: 'Query';
} & {
    medias?: Maybe<({
        __typename?: 'MediaConnection';
    } & {
        nodes: Array<({
            __typename?: 'Media';
        } & BasicMediaInfoFragmentWithMasterRenditionFragment)>;
        pageInfo: ({
            __typename?: 'PageInfo';
        } & PageInfoFragmentFragment);
    })>;
});
export declare type MeQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type MeQuery = ({
    __typename?: 'Query';
} & {
    me: ({
        __typename?: 'User';
    } & Pick<User, 'nodeId' | 'id' | 'givenName' | 'username' | 'avatarUrl' | 'createdAt' | 'isAdmin' | 'name'> & {
        userEmails: ({
            __typename?: 'UserEmailsConnection';
        } & {
            nodes: Array<({
                __typename?: 'UserEmail';
            } & Pick<UserEmail, 'nodeId' | 'email'>)>;
        });
    });
});
export declare type RegisterMutationVariables = Exact<{
    input: RegisterInput;
}>;
export declare type RegisterMutation = ({
    __typename?: 'Mutation';
} & {
    register?: Maybe<({
        __typename?: 'RegisterPayload';
    } & {
        user: ({
            __typename?: 'User';
        } & Pick<User, 'nodeId' | 'id' | 'givenName' | 'familyName' | 'nickname' | 'username' | 'avatarUrl'>);
    })>;
});
export declare type BasicLIghtroomCatalogInfoFragment = ({
    __typename?: 'LightroomCatalog';
} & Pick<LightroomCatalog, 'nodeId' | 'id' | 'name' | 'slug' | 'createdAt' | 'updatedAt'>);
export declare type LightroomCatalogWithCollectionsFragment = ({
    __typename?: 'LightroomCatalog';
} & Pick<LightroomCatalog, 'nodeId' | 'id' | 'collections' | 'collectionSets'>);
export declare type LightroomCatalogQueryVariables = Exact<{
    id: Scalars['Int'];
}>;
export declare type LightroomCatalogQuery = ({
    __typename?: 'Query';
} & {
    lightroomCatalog?: Maybe<({
        __typename?: 'LightroomCatalog';
    } & BasicLIghtroomCatalogInfoFragment & LightroomCatalogWithCollectionsFragment)>;
});
export declare type SyncLightroomCatalogMutationVariables = Exact<{
    id?: Maybe<Scalars['Int']>;
    name: Scalars['String'];
    tags?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
    collections: Scalars['JSON'];
    collectionSets: Scalars['JSON'];
}>;
export declare type SyncLightroomCatalogMutation = ({
    __typename?: 'Mutation';
} & {
    lightroomSyncCatalog?: Maybe<({
        __typename?: 'LightroomSyncCatalogResponse';
    } & {
        catalog?: Maybe<({
            __typename?: 'LightroomCatalog';
        } & BasicLIghtroomCatalogInfoFragment)>;
    })>;
});
export declare type BasicLIghtroomCollectionInfoFragment = ({
    __typename?: 'LightroomCollection';
} & Pick<LightroomCollection, 'nodeId' | 'id' | 'title' | 'slug' | 'searchDescription' | 'createdAt' | 'updatedAt'> & {
    albumList: ({
        __typename?: 'LightroomCollectionAlbumListManyToManyConnection';
    } & {
        edges: Array<({
            __typename?: 'LightroomCollectionAlbumListManyToManyEdge';
        } & {
            node: ({
                __typename?: 'Album';
            } & Pick<Album, 'id'>);
        })>;
    });
});
export declare type SyncLightroomCollectionMutationVariables = Exact<{
    id?: Maybe<Scalars['Int']>;
    title: Scalars['String'];
    catalogId: Scalars['Int'];
    localIdentifier: Scalars['Int'];
    searchDescription?: Maybe<Scalars['JSON']>;
    isSmart?: Maybe<Scalars['Boolean']>;
}>;
export declare type SyncLightroomCollectionMutation = ({
    __typename?: 'Mutation';
} & {
    lightroomSyncCollection?: Maybe<({
        __typename?: 'LightroomSyncCollectionResponse';
    } & {
        collection?: Maybe<({
            __typename?: 'LightroomCollection';
        } & BasicLIghtroomCollectionInfoFragment)>;
    })>;
});
export declare type BasicLIghtroomMediaInfoFragment = ({
    __typename?: 'LightroomMedia';
} & Pick<LightroomMedia, 'id' | 'nodeId' | 'mediaId' | 'uuidIdentifier'>);
export declare type SyncLightroomMediaMutationVariables = Exact<{
    mediaId?: Maybe<Scalars['Int']>;
    lrUuidIdentifier: Scalars['String'];
    currentCollectionId: Scalars['Int'];
    catalogId: Scalars['Int'];
    localIdentifier: Scalars['Int'];
    title?: Maybe<Scalars['String']>;
    headline?: Maybe<Scalars['String']>;
    caption?: Maybe<Scalars['String']>;
    isVirtualCopy?: Maybe<Scalars['Boolean']>;
    masterMedia?: Maybe<LightroomMasterMediaInputPayload>;
    gps?: Maybe<GpsInputPayload>;
}>;
export declare type SyncLightroomMediaMutation = ({
    __typename?: 'Mutation';
} & {
    lightroomSyncMedia?: Maybe<({
        __typename?: 'LightroomSyncMediaResponse';
    } & {
        media?: Maybe<({
            __typename?: 'LightroomMedia';
        } & Pick<LightroomMedia, 'nodeId' | 'id' | 'mediaId' | 'updatedAt'>)>;
    })>;
});
export declare type LightroomRemoveMediaFromCollectionMutationVariables = Exact<{
    mediaId: Scalars['Int'];
    lrCollectionId: Scalars['Int'];
}>;
export declare type LightroomRemoveMediaFromCollectionMutation = ({
    __typename?: 'Mutation';
} & {
    lightroomRemoveMediaFromCollection?: Maybe<({
        __typename?: 'LightroomRemoveMediaFromCollectionResponse';
    } & Pick<LightroomRemoveMediaFromCollectionResponse, 'deleted'>)>;
});
export declare type SyncRenditionMutationVariables = Exact<{
    renditionId?: Maybe<Scalars['Int']>;
    mediaId: Scalars['Int'];
    cid: Scalars['String'];
    height: Scalars['Int'];
    width: Scalars['Int'];
    imageStoragePath: Scalars['String'];
    fileFormat: Scalars['String'];
    fileName: Scalars['String'];
    fileVersion: Scalars['String'];
    isMaster: Scalars['Boolean'];
    isSmartPreview?: Maybe<Scalars['Boolean']>;
    size: Scalars['Int'];
}>;
export declare type SyncRenditionMutation = ({
    __typename?: 'Mutation';
} & {
    lightroomSyncRendition?: Maybe<({
        __typename?: 'LightroomSyncRenditionResponse';
    } & {
        rendition?: Maybe<({
            __typename?: 'Rendition';
        } & Pick<Rendition, 'id' | 'nodeId' | 'mediaId' | 'updatedAt'>)>;
    })>;
});
export declare type GetRenditionByCidWithMediaQueryVariables = Exact<{
    cid: Scalars['String'];
}>;
export declare type GetRenditionByCidWithMediaQuery = ({
    __typename?: 'Query';
} & {
    rendition?: Maybe<({
        __typename?: 'Rendition';
    } & Pick<Rendition, 'nodeId' | 'id' | 'cid' | 'height' | 'imageStoragePath' | 'isMaster' | 'width' | 'updatedAt'> & {
        media?: Maybe<({
            __typename?: 'Media';
        } & Pick<Media, 'nodeId' | 'id'> & {
            copyrights: ({
                __typename?: 'CopyrightsConnection';
            } & {
                nodes: Array<({
                    __typename?: 'Copyright';
                } & Pick<Copyright, 'id' | 'nodeId' | 'statementId' | 'signer'>)>;
            });
        })>;
    })>;
});
export declare type CreateDeviceMutationVariables = Exact<{
    cid: Scalars['String'];
    deviceType: Devicetype;
    identifiers?: Maybe<Scalars['JSON']>;
    maker?: Maybe<Scalars['String']>;
    model?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
}>;
export declare type CreateDeviceMutation = ({
    __typename?: 'Mutation';
} & {
    createDevice?: Maybe<({
        __typename?: 'CreateDevicePayload';
    } & {
        device?: Maybe<({
            __typename?: 'Device';
        } & Pick<Device, 'nodeId' | 'id'>)>;
    })>;
});
export declare const BasicAlbumInfoFragmentFragmentDoc: Apollo.DocumentNode;
export declare const ExtendedAlbumInfoFragmentFragmentDoc: Apollo.DocumentNode;
export declare const CryptoKeyBasicFragmentFragmentDoc: Apollo.DocumentNode;
export declare const CryptoKeyExtendedFragmentFragmentDoc: Apollo.DocumentNode;
export declare const BasicDeviceInfoFragmentDoc: Apollo.DocumentNode;
export declare const FullDeviceInfoFragmentDoc: Apollo.DocumentNode;
export declare const PageInfoFragmentFragmentDoc: Apollo.DocumentNode;
export declare const BasicMediaInfoFragmentFragmentDoc: Apollo.DocumentNode;
export declare const MasterRenditionFragmentFragmentDoc: Apollo.DocumentNode;
export declare const BasicMediaInfoFragmentWithMasterRenditionFragmentDoc: Apollo.DocumentNode;
export declare const BasicLIghtroomCatalogInfoFragmentDoc: Apollo.DocumentNode;
export declare const LightroomCatalogWithCollectionsFragmentDoc: Apollo.DocumentNode;
export declare const BasicLIghtroomCollectionInfoFragmentDoc: Apollo.DocumentNode;
export declare const BasicLIghtroomMediaInfoFragmentDoc: Apollo.DocumentNode;
export declare const GetAlbumsDocument: Apollo.DocumentNode;
/**
 * __useGetAlbumsQuery__
 *
 * To run a query within a React component, call `useGetAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumsQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useGetAlbumsQuery(baseOptions?: Apollo.QueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>): Apollo.QueryResult<GetAlbumsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetAlbumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>): Apollo.QueryTuple<GetAlbumsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetAlbumsQueryHookResult = ReturnType<typeof useGetAlbumsQuery>;
export declare type GetAlbumsLazyQueryHookResult = ReturnType<typeof useGetAlbumsLazyQuery>;
export declare type GetAlbumsQueryResult = Apollo.QueryResult<GetAlbumsQuery, GetAlbumsQueryVariables>;
export declare function refetchGetAlbumsQuery(variables?: GetAlbumsQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        [key: string]: never;
    }> | undefined;
};
export declare const GetAlbumDetailsDocument: Apollo.DocumentNode;
/**
 * __useGetAlbumDetailsQuery__
 *
 * To run a query within a React component, call `useGetAlbumDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export declare function useGetAlbumDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetAlbumDetailsQuery, GetAlbumDetailsQueryVariables>): Apollo.QueryResult<GetAlbumDetailsQuery, Exact<{
    id: number;
}>>;
export declare function useGetAlbumDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlbumDetailsQuery, GetAlbumDetailsQueryVariables>): Apollo.QueryTuple<GetAlbumDetailsQuery, Exact<{
    id: number;
}>>;
export declare type GetAlbumDetailsQueryHookResult = ReturnType<typeof useGetAlbumDetailsQuery>;
export declare type GetAlbumDetailsLazyQueryHookResult = ReturnType<typeof useGetAlbumDetailsLazyQuery>;
export declare type GetAlbumDetailsQueryResult = Apollo.QueryResult<GetAlbumDetailsQuery, GetAlbumDetailsQueryVariables>;
export declare function refetchGetAlbumDetailsQuery(variables?: GetAlbumDetailsQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        id: number;
    }> | undefined;
};
export declare const UpdateMediaCopyrightDocument: Apollo.DocumentNode;
export declare type UpdateMediaCopyrightMutationFn = Apollo.MutationFunction<UpdateMediaCopyrightMutation, UpdateMediaCopyrightMutationVariables>;
/**
 * __useUpdateMediaCopyrightMutation__
 *
 * To run a mutation, you first call `useUpdateMediaCopyrightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMediaCopyrightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMediaCopyrightMutation, { data, loading, error }] = useUpdateMediaCopyrightMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export declare function useUpdateMediaCopyrightMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMediaCopyrightMutation, UpdateMediaCopyrightMutationVariables>): Apollo.MutationTuple<UpdateMediaCopyrightMutation, Exact<{
    input: MediaCopyright | MediaCopyright[];
}>>;
export declare type UpdateMediaCopyrightMutationHookResult = ReturnType<typeof useUpdateMediaCopyrightMutation>;
export declare type UpdateMediaCopyrightMutationResult = Apollo.MutationResult<UpdateMediaCopyrightMutation>;
export declare type UpdateMediaCopyrightMutationOptions = Apollo.BaseMutationOptions<UpdateMediaCopyrightMutation, UpdateMediaCopyrightMutationVariables>;
export declare const GetMyCryptoKeysBasicDocument: Apollo.DocumentNode;
/**
 * __useGetMyCryptoKeysBasicQuery__
 *
 * To run a query within a React component, call `useGetMyCryptoKeysBasicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCryptoKeysBasicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCryptoKeysBasicQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useGetMyCryptoKeysBasicQuery(baseOptions?: Apollo.QueryHookOptions<GetMyCryptoKeysBasicQuery, GetMyCryptoKeysBasicQueryVariables>): Apollo.QueryResult<GetMyCryptoKeysBasicQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetMyCryptoKeysBasicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyCryptoKeysBasicQuery, GetMyCryptoKeysBasicQueryVariables>): Apollo.QueryTuple<GetMyCryptoKeysBasicQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetMyCryptoKeysBasicQueryHookResult = ReturnType<typeof useGetMyCryptoKeysBasicQuery>;
export declare type GetMyCryptoKeysBasicLazyQueryHookResult = ReturnType<typeof useGetMyCryptoKeysBasicLazyQuery>;
export declare type GetMyCryptoKeysBasicQueryResult = Apollo.QueryResult<GetMyCryptoKeysBasicQuery, GetMyCryptoKeysBasicQueryVariables>;
export declare function refetchGetMyCryptoKeysBasicQuery(variables?: GetMyCryptoKeysBasicQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        [key: string]: never;
    }> | undefined;
};
export declare const GetMyCryptoKeysExtendedDocument: Apollo.DocumentNode;
/**
 * __useGetMyCryptoKeysExtendedQuery__
 *
 * To run a query within a React component, call `useGetMyCryptoKeysExtendedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCryptoKeysExtendedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCryptoKeysExtendedQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useGetMyCryptoKeysExtendedQuery(baseOptions?: Apollo.QueryHookOptions<GetMyCryptoKeysExtendedQuery, GetMyCryptoKeysExtendedQueryVariables>): Apollo.QueryResult<GetMyCryptoKeysExtendedQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetMyCryptoKeysExtendedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyCryptoKeysExtendedQuery, GetMyCryptoKeysExtendedQueryVariables>): Apollo.QueryTuple<GetMyCryptoKeysExtendedQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetMyCryptoKeysExtendedQueryHookResult = ReturnType<typeof useGetMyCryptoKeysExtendedQuery>;
export declare type GetMyCryptoKeysExtendedLazyQueryHookResult = ReturnType<typeof useGetMyCryptoKeysExtendedLazyQuery>;
export declare type GetMyCryptoKeysExtendedQueryResult = Apollo.QueryResult<GetMyCryptoKeysExtendedQuery, GetMyCryptoKeysExtendedQueryVariables>;
export declare function refetchGetMyCryptoKeysExtendedQuery(variables?: GetMyCryptoKeysExtendedQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        [key: string]: never;
    }> | undefined;
};
export declare const MyDevicesDocument: Apollo.DocumentNode;
/**
 * __useMyDevicesQuery__
 *
 * To run a query within a React component, call `useMyDevicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyDevicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyDevicesQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useMyDevicesQuery(baseOptions?: Apollo.QueryHookOptions<MyDevicesQuery, MyDevicesQueryVariables>): Apollo.QueryResult<MyDevicesQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useMyDevicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyDevicesQuery, MyDevicesQueryVariables>): Apollo.QueryTuple<MyDevicesQuery, Exact<{
    [key: string]: never;
}>>;
export declare type MyDevicesQueryHookResult = ReturnType<typeof useMyDevicesQuery>;
export declare type MyDevicesLazyQueryHookResult = ReturnType<typeof useMyDevicesLazyQuery>;
export declare type MyDevicesQueryResult = Apollo.QueryResult<MyDevicesQuery, MyDevicesQueryVariables>;
export declare function refetchMyDevicesQuery(variables?: MyDevicesQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        [key: string]: never;
    }> | undefined;
};
export declare const PoCloForVerificationDocument: Apollo.DocumentNode;
/**
 * __usePoCloForVerificationQuery__
 *
 * To run a query within a React component, call `usePoCloForVerificationQuery` and pass it any options that fit your needs.
 * When your component renders, `usePoCloForVerificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePoCloForVerificationQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export declare function usePoCloForVerificationQuery(baseOptions?: Apollo.QueryHookOptions<PoCloForVerificationQuery, PoCloForVerificationQueryVariables>): Apollo.QueryResult<PoCloForVerificationQuery, Exact<{
    ids?: Maybe<string | string[]> | undefined;
}>>;
export declare function usePoCloForVerificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PoCloForVerificationQuery, PoCloForVerificationQueryVariables>): Apollo.QueryTuple<PoCloForVerificationQuery, Exact<{
    ids?: Maybe<string | string[]> | undefined;
}>>;
export declare type PoCloForVerificationQueryHookResult = ReturnType<typeof usePoCloForVerificationQuery>;
export declare type PoCloForVerificationLazyQueryHookResult = ReturnType<typeof usePoCloForVerificationLazyQuery>;
export declare type PoCloForVerificationQueryResult = Apollo.QueryResult<PoCloForVerificationQuery, PoCloForVerificationQueryVariables>;
export declare function refetchPoCloForVerificationQuery(variables?: PoCloForVerificationQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        ids?: Maybe<string | string[]> | undefined;
    }> | undefined;
};
export declare const AddOwnershipToDevicesDocument: Apollo.DocumentNode;
export declare type AddOwnershipToDevicesMutationFn = Apollo.MutationFunction<AddOwnershipToDevicesMutation, AddOwnershipToDevicesMutationVariables>;
/**
 * __useAddOwnershipToDevicesMutation__
 *
 * To run a mutation, you first call `useAddOwnershipToDevicesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOwnershipToDevicesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOwnershipToDevicesMutation, { data, loading, error }] = useAddOwnershipToDevicesMutation({
 *   variables: {
 *      cid: // value for 'cid'
 *      statementId: // value for 'statementId'
 *      pallet: // value for 'pallet'
 *      verified: // value for 'verified'
 *      createdAt: // value for 'createdAt'
 *   },
 * });
 */
export declare function useAddOwnershipToDevicesMutation(baseOptions?: Apollo.MutationHookOptions<AddOwnershipToDevicesMutation, AddOwnershipToDevicesMutationVariables>): Apollo.MutationTuple<AddOwnershipToDevicesMutation, Exact<{
    cid: string;
    statementId: string;
    pallet: string;
    verified: boolean;
    createdAt: string;
}>>;
export declare type AddOwnershipToDevicesMutationHookResult = ReturnType<typeof useAddOwnershipToDevicesMutation>;
export declare type AddOwnershipToDevicesMutationResult = Apollo.MutationResult<AddOwnershipToDevicesMutation>;
export declare type AddOwnershipToDevicesMutationOptions = Apollo.BaseMutationOptions<AddOwnershipToDevicesMutation, AddOwnershipToDevicesMutationVariables>;
export declare const IsLoggedInQueryDocument: Apollo.DocumentNode;
/**
 * __useIsLoggedInQueryQuery__
 *
 * To run a query within a React component, call `useIsLoggedInQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsLoggedInQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsLoggedInQueryQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useIsLoggedInQueryQuery(baseOptions?: Apollo.QueryHookOptions<IsLoggedInQueryQuery, IsLoggedInQueryQueryVariables>): Apollo.QueryResult<IsLoggedInQueryQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useIsLoggedInQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsLoggedInQueryQuery, IsLoggedInQueryQueryVariables>): Apollo.QueryTuple<IsLoggedInQueryQuery, Exact<{
    [key: string]: never;
}>>;
export declare type IsLoggedInQueryQueryHookResult = ReturnType<typeof useIsLoggedInQueryQuery>;
export declare type IsLoggedInQueryLazyQueryHookResult = ReturnType<typeof useIsLoggedInQueryLazyQuery>;
export declare type IsLoggedInQueryQueryResult = Apollo.QueryResult<IsLoggedInQueryQuery, IsLoggedInQueryQueryVariables>;
export declare function refetchIsLoggedInQueryQuery(variables?: IsLoggedInQueryQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        [key: string]: never;
    }> | undefined;
};
export declare const ActiveNotificationDocument: Apollo.DocumentNode;
/**
 * __useActiveNotificationQuery__
 *
 * To run a query within a React component, call `useActiveNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveNotificationQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useActiveNotificationQuery(baseOptions?: Apollo.QueryHookOptions<ActiveNotificationQuery, ActiveNotificationQueryVariables>): Apollo.QueryResult<ActiveNotificationQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useActiveNotificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActiveNotificationQuery, ActiveNotificationQueryVariables>): Apollo.QueryTuple<ActiveNotificationQuery, Exact<{
    [key: string]: never;
}>>;
export declare type ActiveNotificationQueryHookResult = ReturnType<typeof useActiveNotificationQuery>;
export declare type ActiveNotificationLazyQueryHookResult = ReturnType<typeof useActiveNotificationLazyQuery>;
export declare type ActiveNotificationQueryResult = Apollo.QueryResult<ActiveNotificationQuery, ActiveNotificationQueryVariables>;
export declare function refetchActiveNotificationQuery(variables?: ActiveNotificationQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        [key: string]: never;
    }> | undefined;
};
export declare const SelectedMediaDocument: Apollo.DocumentNode;
/**
 * __useSelectedMediaQuery__
 *
 * To run a query within a React component, call `useSelectedMediaQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectedMediaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectedMediaQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useSelectedMediaQuery(baseOptions?: Apollo.QueryHookOptions<SelectedMediaQuery, SelectedMediaQueryVariables>): Apollo.QueryResult<SelectedMediaQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useSelectedMediaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SelectedMediaQuery, SelectedMediaQueryVariables>): Apollo.QueryTuple<SelectedMediaQuery, Exact<{
    [key: string]: never;
}>>;
export declare type SelectedMediaQueryHookResult = ReturnType<typeof useSelectedMediaQuery>;
export declare type SelectedMediaLazyQueryHookResult = ReturnType<typeof useSelectedMediaLazyQuery>;
export declare type SelectedMediaQueryResult = Apollo.QueryResult<SelectedMediaQuery, SelectedMediaQueryVariables>;
export declare function refetchSelectedMediaQuery(variables?: SelectedMediaQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        [key: string]: never;
    }> | undefined;
};
export declare const MediaPreviewDocument: Apollo.DocumentNode;
/**
 * __useMediaPreviewQuery__
 *
 * To run a query within a React component, call `useMediaPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useMediaPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMediaPreviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export declare function useMediaPreviewQuery(baseOptions: Apollo.QueryHookOptions<MediaPreviewQuery, MediaPreviewQueryVariables>): Apollo.QueryResult<MediaPreviewQuery, Exact<{
    id: number;
}>>;
export declare function useMediaPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MediaPreviewQuery, MediaPreviewQueryVariables>): Apollo.QueryTuple<MediaPreviewQuery, Exact<{
    id: number;
}>>;
export declare type MediaPreviewQueryHookResult = ReturnType<typeof useMediaPreviewQuery>;
export declare type MediaPreviewLazyQueryHookResult = ReturnType<typeof useMediaPreviewLazyQuery>;
export declare type MediaPreviewQueryResult = Apollo.QueryResult<MediaPreviewQuery, MediaPreviewQueryVariables>;
export declare function refetchMediaPreviewQuery(variables?: MediaPreviewQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        id: number;
    }> | undefined;
};
export declare const MediaKeywordsDocument: Apollo.DocumentNode;
/**
 * __useMediaKeywordsQuery__
 *
 * To run a query within a React component, call `useMediaKeywordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMediaKeywordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMediaKeywordsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export declare function useMediaKeywordsQuery(baseOptions: Apollo.QueryHookOptions<MediaKeywordsQuery, MediaKeywordsQueryVariables>): Apollo.QueryResult<MediaKeywordsQuery, Exact<{
    id: number;
}>>;
export declare function useMediaKeywordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MediaKeywordsQuery, MediaKeywordsQueryVariables>): Apollo.QueryTuple<MediaKeywordsQuery, Exact<{
    id: number;
}>>;
export declare type MediaKeywordsQueryHookResult = ReturnType<typeof useMediaKeywordsQuery>;
export declare type MediaKeywordsLazyQueryHookResult = ReturnType<typeof useMediaKeywordsLazyQuery>;
export declare type MediaKeywordsQueryResult = Apollo.QueryResult<MediaKeywordsQuery, MediaKeywordsQueryVariables>;
export declare function refetchMediaKeywordsQuery(variables?: MediaKeywordsQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        id: number;
    }> | undefined;
};
export declare const MediaCopyrightsDocument: Apollo.DocumentNode;
/**
 * __useMediaCopyrightsQuery__
 *
 * To run a query within a React component, call `useMediaCopyrightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMediaCopyrightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMediaCopyrightsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export declare function useMediaCopyrightsQuery(baseOptions: Apollo.QueryHookOptions<MediaCopyrightsQuery, MediaCopyrightsQueryVariables>): Apollo.QueryResult<MediaCopyrightsQuery, Exact<{
    id: number;
}>>;
export declare function useMediaCopyrightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MediaCopyrightsQuery, MediaCopyrightsQueryVariables>): Apollo.QueryTuple<MediaCopyrightsQuery, Exact<{
    id: number;
}>>;
export declare type MediaCopyrightsQueryHookResult = ReturnType<typeof useMediaCopyrightsQuery>;
export declare type MediaCopyrightsLazyQueryHookResult = ReturnType<typeof useMediaCopyrightsLazyQuery>;
export declare type MediaCopyrightsQueryResult = Apollo.QueryResult<MediaCopyrightsQuery, MediaCopyrightsQueryVariables>;
export declare function refetchMediaCopyrightsQuery(variables?: MediaCopyrightsQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        id: number;
    }> | undefined;
};
export declare const MediaReadyForCopyrightDocument: Apollo.DocumentNode;
/**
 * __useMediaReadyForCopyrightQuery__
 *
 * To run a query within a React component, call `useMediaReadyForCopyrightQuery` and pass it any options that fit your needs.
 * When your component renders, `useMediaReadyForCopyrightQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMediaReadyForCopyrightQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useMediaReadyForCopyrightQuery(baseOptions?: Apollo.QueryHookOptions<MediaReadyForCopyrightQuery, MediaReadyForCopyrightQueryVariables>): Apollo.QueryResult<MediaReadyForCopyrightQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useMediaReadyForCopyrightLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MediaReadyForCopyrightQuery, MediaReadyForCopyrightQueryVariables>): Apollo.QueryTuple<MediaReadyForCopyrightQuery, Exact<{
    [key: string]: never;
}>>;
export declare type MediaReadyForCopyrightQueryHookResult = ReturnType<typeof useMediaReadyForCopyrightQuery>;
export declare type MediaReadyForCopyrightLazyQueryHookResult = ReturnType<typeof useMediaReadyForCopyrightLazyQuery>;
export declare type MediaReadyForCopyrightQueryResult = Apollo.QueryResult<MediaReadyForCopyrightQuery, MediaReadyForCopyrightQueryVariables>;
export declare function refetchMediaReadyForCopyrightQuery(variables?: MediaReadyForCopyrightQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        [key: string]: never;
    }> | undefined;
};
export declare const CreateRenditionDocument: Apollo.DocumentNode;
export declare type CreateRenditionMutationFn = Apollo.MutationFunction<CreateRenditionMutation, CreateRenditionMutationVariables>;
/**
 * __useCreateRenditionMutation__
 *
 * To run a mutation, you first call `useCreateRenditionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRenditionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRenditionMutation, { data, loading, error }] = useCreateRenditionMutation({
 *   variables: {
 *      cid: // value for 'cid'
 *      pixelCid: // value for 'pixelCid'
 *      metadataCid: // value for 'metadataCid'
 *      height: // value for 'height'
 *      width: // value for 'width'
 *      imageStoragePath: // value for 'imageStoragePath'
 *      metadataStoragePath: // value for 'metadataStoragePath'
 *      isMaster: // value for 'isMaster'
 *      fileFormat: // value for 'fileFormat'
 *      mediaId: // value for 'mediaId'
 *   },
 * });
 */
export declare function useCreateRenditionMutation(baseOptions?: Apollo.MutationHookOptions<CreateRenditionMutation, CreateRenditionMutationVariables>): Apollo.MutationTuple<CreateRenditionMutation, Exact<{
    cid: string;
    pixelCid: string;
    metadataCid: string;
    height: number;
    width: number;
    imageStoragePath: string;
    metadataStoragePath: string;
    isMaster?: Maybe<boolean> | undefined;
    fileFormat?: Maybe<string> | undefined;
    mediaId: number;
}>>;
export declare type CreateRenditionMutationHookResult = ReturnType<typeof useCreateRenditionMutation>;
export declare type CreateRenditionMutationResult = Apollo.MutationResult<CreateRenditionMutation>;
export declare type CreateRenditionMutationOptions = Apollo.BaseMutationOptions<CreateRenditionMutation, CreateRenditionMutationVariables>;
export declare const GetRenditionByCidDocument: Apollo.DocumentNode;
/**
 * __useGetRenditionByCidQuery__
 *
 * To run a query within a React component, call `useGetRenditionByCidQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRenditionByCidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRenditionByCidQuery({
 *   variables: {
 *      cid: // value for 'cid'
 *   },
 * });
 */
export declare function useGetRenditionByCidQuery(baseOptions: Apollo.QueryHookOptions<GetRenditionByCidQuery, GetRenditionByCidQueryVariables>): Apollo.QueryResult<GetRenditionByCidQuery, Exact<{
    cid: string;
}>>;
export declare function useGetRenditionByCidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRenditionByCidQuery, GetRenditionByCidQueryVariables>): Apollo.QueryTuple<GetRenditionByCidQuery, Exact<{
    cid: string;
}>>;
export declare type GetRenditionByCidQueryHookResult = ReturnType<typeof useGetRenditionByCidQuery>;
export declare type GetRenditionByCidLazyQueryHookResult = ReturnType<typeof useGetRenditionByCidLazyQuery>;
export declare type GetRenditionByCidQueryResult = Apollo.QueryResult<GetRenditionByCidQuery, GetRenditionByCidQueryVariables>;
export declare function refetchGetRenditionByCidQuery(variables?: GetRenditionByCidQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        cid: string;
    }> | undefined;
};
export declare const TimelineMediaDocument: Apollo.DocumentNode;
/**
 * __useTimelineMediaQuery__
 *
 * To run a query within a React component, call `useTimelineMediaQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimelineMediaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimelineMediaQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export declare function useTimelineMediaQuery(baseOptions: Apollo.QueryHookOptions<TimelineMediaQuery, TimelineMediaQueryVariables>): Apollo.QueryResult<TimelineMediaQuery, Exact<{
    first: number;
    after?: any;
}>>;
export declare function useTimelineMediaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimelineMediaQuery, TimelineMediaQueryVariables>): Apollo.QueryTuple<TimelineMediaQuery, Exact<{
    first: number;
    after?: any;
}>>;
export declare type TimelineMediaQueryHookResult = ReturnType<typeof useTimelineMediaQuery>;
export declare type TimelineMediaLazyQueryHookResult = ReturnType<typeof useTimelineMediaLazyQuery>;
export declare type TimelineMediaQueryResult = Apollo.QueryResult<TimelineMediaQuery, TimelineMediaQueryVariables>;
export declare function refetchTimelineMediaQuery(variables?: TimelineMediaQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        first: number;
        after?: any;
    }> | undefined;
};
export declare const MeDocument: Apollo.DocumentNode;
/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>): Apollo.QueryResult<MeQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.QueryTuple<MeQuery, Exact<{
    [key: string]: never;
}>>;
export declare type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export declare type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export declare type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export declare function refetchMeQuery(variables?: MeQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        [key: string]: never;
    }> | undefined;
};
export declare const RegisterDocument: Apollo.DocumentNode;
export declare type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;
/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export declare function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>): Apollo.MutationTuple<RegisterMutation, Exact<{
    input: RegisterInput;
}>>;
export declare type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export declare type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export declare type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export declare const LightroomCatalogDocument: Apollo.DocumentNode;
/**
 * __useLightroomCatalogQuery__
 *
 * To run a query within a React component, call `useLightroomCatalogQuery` and pass it any options that fit your needs.
 * When your component renders, `useLightroomCatalogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLightroomCatalogQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export declare function useLightroomCatalogQuery(baseOptions: Apollo.QueryHookOptions<LightroomCatalogQuery, LightroomCatalogQueryVariables>): Apollo.QueryResult<LightroomCatalogQuery, Exact<{
    id: number;
}>>;
export declare function useLightroomCatalogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LightroomCatalogQuery, LightroomCatalogQueryVariables>): Apollo.QueryTuple<LightroomCatalogQuery, Exact<{
    id: number;
}>>;
export declare type LightroomCatalogQueryHookResult = ReturnType<typeof useLightroomCatalogQuery>;
export declare type LightroomCatalogLazyQueryHookResult = ReturnType<typeof useLightroomCatalogLazyQuery>;
export declare type LightroomCatalogQueryResult = Apollo.QueryResult<LightroomCatalogQuery, LightroomCatalogQueryVariables>;
export declare function refetchLightroomCatalogQuery(variables?: LightroomCatalogQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        id: number;
    }> | undefined;
};
export declare const SyncLightroomCatalogDocument: Apollo.DocumentNode;
export declare type SyncLightroomCatalogMutationFn = Apollo.MutationFunction<SyncLightroomCatalogMutation, SyncLightroomCatalogMutationVariables>;
/**
 * __useSyncLightroomCatalogMutation__
 *
 * To run a mutation, you first call `useSyncLightroomCatalogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncLightroomCatalogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncLightroomCatalogMutation, { data, loading, error }] = useSyncLightroomCatalogMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      tags: // value for 'tags'
 *      collections: // value for 'collections'
 *      collectionSets: // value for 'collectionSets'
 *   },
 * });
 */
export declare function useSyncLightroomCatalogMutation(baseOptions?: Apollo.MutationHookOptions<SyncLightroomCatalogMutation, SyncLightroomCatalogMutationVariables>): Apollo.MutationTuple<SyncLightroomCatalogMutation, Exact<{
    id?: Maybe<number> | undefined;
    name: string;
    tags?: Maybe<Maybe<string> | Maybe<string>[]> | undefined;
    collections: {
        [key: string]: any;
    };
    collectionSets: {
        [key: string]: any;
    };
}>>;
export declare type SyncLightroomCatalogMutationHookResult = ReturnType<typeof useSyncLightroomCatalogMutation>;
export declare type SyncLightroomCatalogMutationResult = Apollo.MutationResult<SyncLightroomCatalogMutation>;
export declare type SyncLightroomCatalogMutationOptions = Apollo.BaseMutationOptions<SyncLightroomCatalogMutation, SyncLightroomCatalogMutationVariables>;
export declare const SyncLightroomCollectionDocument: Apollo.DocumentNode;
export declare type SyncLightroomCollectionMutationFn = Apollo.MutationFunction<SyncLightroomCollectionMutation, SyncLightroomCollectionMutationVariables>;
/**
 * __useSyncLightroomCollectionMutation__
 *
 * To run a mutation, you first call `useSyncLightroomCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncLightroomCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncLightroomCollectionMutation, { data, loading, error }] = useSyncLightroomCollectionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      catalogId: // value for 'catalogId'
 *      localIdentifier: // value for 'localIdentifier'
 *      searchDescription: // value for 'searchDescription'
 *      isSmart: // value for 'isSmart'
 *   },
 * });
 */
export declare function useSyncLightroomCollectionMutation(baseOptions?: Apollo.MutationHookOptions<SyncLightroomCollectionMutation, SyncLightroomCollectionMutationVariables>): Apollo.MutationTuple<SyncLightroomCollectionMutation, Exact<{
    id?: Maybe<number> | undefined;
    title: string;
    catalogId: number;
    localIdentifier: number;
    searchDescription?: Maybe<{
        [key: string]: any;
    }> | undefined;
    isSmart?: Maybe<boolean> | undefined;
}>>;
export declare type SyncLightroomCollectionMutationHookResult = ReturnType<typeof useSyncLightroomCollectionMutation>;
export declare type SyncLightroomCollectionMutationResult = Apollo.MutationResult<SyncLightroomCollectionMutation>;
export declare type SyncLightroomCollectionMutationOptions = Apollo.BaseMutationOptions<SyncLightroomCollectionMutation, SyncLightroomCollectionMutationVariables>;
export declare const SyncLightroomMediaDocument: Apollo.DocumentNode;
export declare type SyncLightroomMediaMutationFn = Apollo.MutationFunction<SyncLightroomMediaMutation, SyncLightroomMediaMutationVariables>;
/**
 * __useSyncLightroomMediaMutation__
 *
 * To run a mutation, you first call `useSyncLightroomMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncLightroomMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncLightroomMediaMutation, { data, loading, error }] = useSyncLightroomMediaMutation({
 *   variables: {
 *      mediaId: // value for 'mediaId'
 *      lrUuidIdentifier: // value for 'lrUuidIdentifier'
 *      currentCollectionId: // value for 'currentCollectionId'
 *      catalogId: // value for 'catalogId'
 *      localIdentifier: // value for 'localIdentifier'
 *      title: // value for 'title'
 *      headline: // value for 'headline'
 *      caption: // value for 'caption'
 *      isVirtualCopy: // value for 'isVirtualCopy'
 *      masterMedia: // value for 'masterMedia'
 *      gps: // value for 'gps'
 *   },
 * });
 */
export declare function useSyncLightroomMediaMutation(baseOptions?: Apollo.MutationHookOptions<SyncLightroomMediaMutation, SyncLightroomMediaMutationVariables>): Apollo.MutationTuple<SyncLightroomMediaMutation, Exact<{
    mediaId?: Maybe<number> | undefined;
    lrUuidIdentifier: string;
    currentCollectionId: number;
    catalogId: number;
    localIdentifier: number;
    title?: Maybe<string> | undefined;
    headline?: Maybe<string> | undefined;
    caption?: Maybe<string> | undefined;
    isVirtualCopy?: Maybe<boolean> | undefined;
    masterMedia?: Maybe<LightroomMasterMediaInputPayload> | undefined;
    gps?: Maybe<GpsInputPayload> | undefined;
}>>;
export declare type SyncLightroomMediaMutationHookResult = ReturnType<typeof useSyncLightroomMediaMutation>;
export declare type SyncLightroomMediaMutationResult = Apollo.MutationResult<SyncLightroomMediaMutation>;
export declare type SyncLightroomMediaMutationOptions = Apollo.BaseMutationOptions<SyncLightroomMediaMutation, SyncLightroomMediaMutationVariables>;
export declare const LightroomRemoveMediaFromCollectionDocument: Apollo.DocumentNode;
export declare type LightroomRemoveMediaFromCollectionMutationFn = Apollo.MutationFunction<LightroomRemoveMediaFromCollectionMutation, LightroomRemoveMediaFromCollectionMutationVariables>;
/**
 * __useLightroomRemoveMediaFromCollectionMutation__
 *
 * To run a mutation, you first call `useLightroomRemoveMediaFromCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLightroomRemoveMediaFromCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lightroomRemoveMediaFromCollectionMutation, { data, loading, error }] = useLightroomRemoveMediaFromCollectionMutation({
 *   variables: {
 *      mediaId: // value for 'mediaId'
 *      lrCollectionId: // value for 'lrCollectionId'
 *   },
 * });
 */
export declare function useLightroomRemoveMediaFromCollectionMutation(baseOptions?: Apollo.MutationHookOptions<LightroomRemoveMediaFromCollectionMutation, LightroomRemoveMediaFromCollectionMutationVariables>): Apollo.MutationTuple<LightroomRemoveMediaFromCollectionMutation, Exact<{
    mediaId: number;
    lrCollectionId: number;
}>>;
export declare type LightroomRemoveMediaFromCollectionMutationHookResult = ReturnType<typeof useLightroomRemoveMediaFromCollectionMutation>;
export declare type LightroomRemoveMediaFromCollectionMutationResult = Apollo.MutationResult<LightroomRemoveMediaFromCollectionMutation>;
export declare type LightroomRemoveMediaFromCollectionMutationOptions = Apollo.BaseMutationOptions<LightroomRemoveMediaFromCollectionMutation, LightroomRemoveMediaFromCollectionMutationVariables>;
export declare const SyncRenditionDocument: Apollo.DocumentNode;
export declare type SyncRenditionMutationFn = Apollo.MutationFunction<SyncRenditionMutation, SyncRenditionMutationVariables>;
/**
 * __useSyncRenditionMutation__
 *
 * To run a mutation, you first call `useSyncRenditionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncRenditionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncRenditionMutation, { data, loading, error }] = useSyncRenditionMutation({
 *   variables: {
 *      renditionId: // value for 'renditionId'
 *      mediaId: // value for 'mediaId'
 *      cid: // value for 'cid'
 *      height: // value for 'height'
 *      width: // value for 'width'
 *      imageStoragePath: // value for 'imageStoragePath'
 *      fileFormat: // value for 'fileFormat'
 *      fileName: // value for 'fileName'
 *      fileVersion: // value for 'fileVersion'
 *      isMaster: // value for 'isMaster'
 *      isSmartPreview: // value for 'isSmartPreview'
 *      size: // value for 'size'
 *   },
 * });
 */
export declare function useSyncRenditionMutation(baseOptions?: Apollo.MutationHookOptions<SyncRenditionMutation, SyncRenditionMutationVariables>): Apollo.MutationTuple<SyncRenditionMutation, Exact<{
    renditionId?: Maybe<number> | undefined;
    mediaId: number;
    cid: string;
    height: number;
    width: number;
    imageStoragePath: string;
    fileFormat: string;
    fileName: string;
    fileVersion: string;
    isMaster: boolean;
    isSmartPreview?: Maybe<boolean> | undefined;
    size: number;
}>>;
export declare type SyncRenditionMutationHookResult = ReturnType<typeof useSyncRenditionMutation>;
export declare type SyncRenditionMutationResult = Apollo.MutationResult<SyncRenditionMutation>;
export declare type SyncRenditionMutationOptions = Apollo.BaseMutationOptions<SyncRenditionMutation, SyncRenditionMutationVariables>;
export declare const GetRenditionByCidWithMediaDocument: Apollo.DocumentNode;
/**
 * __useGetRenditionByCidWithMediaQuery__
 *
 * To run a query within a React component, call `useGetRenditionByCidWithMediaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRenditionByCidWithMediaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRenditionByCidWithMediaQuery({
 *   variables: {
 *      cid: // value for 'cid'
 *   },
 * });
 */
export declare function useGetRenditionByCidWithMediaQuery(baseOptions: Apollo.QueryHookOptions<GetRenditionByCidWithMediaQuery, GetRenditionByCidWithMediaQueryVariables>): Apollo.QueryResult<GetRenditionByCidWithMediaQuery, Exact<{
    cid: string;
}>>;
export declare function useGetRenditionByCidWithMediaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRenditionByCidWithMediaQuery, GetRenditionByCidWithMediaQueryVariables>): Apollo.QueryTuple<GetRenditionByCidWithMediaQuery, Exact<{
    cid: string;
}>>;
export declare type GetRenditionByCidWithMediaQueryHookResult = ReturnType<typeof useGetRenditionByCidWithMediaQuery>;
export declare type GetRenditionByCidWithMediaLazyQueryHookResult = ReturnType<typeof useGetRenditionByCidWithMediaLazyQuery>;
export declare type GetRenditionByCidWithMediaQueryResult = Apollo.QueryResult<GetRenditionByCidWithMediaQuery, GetRenditionByCidWithMediaQueryVariables>;
export declare function refetchGetRenditionByCidWithMediaQuery(variables?: GetRenditionByCidWithMediaQueryVariables): {
    query: Apollo.DocumentNode;
    variables: Exact<{
        cid: string;
    }> | undefined;
};
export declare const CreateDeviceDocument: Apollo.DocumentNode;
export declare type CreateDeviceMutationFn = Apollo.MutationFunction<CreateDeviceMutation, CreateDeviceMutationVariables>;
/**
 * __useCreateDeviceMutation__
 *
 * To run a mutation, you first call `useCreateDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeviceMutation, { data, loading, error }] = useCreateDeviceMutation({
 *   variables: {
 *      cid: // value for 'cid'
 *      deviceType: // value for 'deviceType'
 *      identifiers: // value for 'identifiers'
 *      maker: // value for 'maker'
 *      model: // value for 'model'
 *      name: // value for 'name'
 *   },
 * });
 */
export declare function useCreateDeviceMutation(baseOptions?: Apollo.MutationHookOptions<CreateDeviceMutation, CreateDeviceMutationVariables>): Apollo.MutationTuple<CreateDeviceMutation, Exact<{
    cid: string;
    deviceType: Devicetype;
    identifiers?: Maybe<{
        [key: string]: any;
    }> | undefined;
    maker?: Maybe<string> | undefined;
    model?: Maybe<string> | undefined;
    name?: Maybe<string> | undefined;
}>>;
export declare type CreateDeviceMutationHookResult = ReturnType<typeof useCreateDeviceMutation>;
export declare type CreateDeviceMutationResult = Apollo.MutationResult<CreateDeviceMutation>;
export declare type CreateDeviceMutationOptions = Apollo.BaseMutationOptions<CreateDeviceMutation, CreateDeviceMutationVariables>;
