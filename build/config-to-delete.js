

const pagination = {
  source: 'query',
  type: 'infinite-scroll',
  params: {
    limit: {
      name: 'limit',
      value: '2'
    },
    page: {
      name: 'page',
      value: '1'
    },
  },
  fields: {
    total: {
      dataPath: 'total',
    },
  }
};

const displayFields = [
  {
    name: 'code',
    type: 'text',
    label: 'Code'
  },
  {
    name: 'name',
    type: 'text',
    label: 'Nom'
  },
  {
    name: 'codeProtocol',
    label: 'Protocol',
    type: 'text'
  },
  {
    name: 'hasConfigSchema',
    type: 'boolean',
    label: 'Schéma de configuration'
  }
];
const putFields = [
  {
    name: 'name',
    type: 'text',
    label: 'Nom'
  },
  {
    name: 'codeProtocol',
    label: 'Code de son protocol',
    type: 'select',
    optionSource: {
      url: '/v1/protocols',
      dataPath: 'data',
      displayPath: 'code',
      valuePath: 'code',
      sortBy: 'code'
    }
  },
  {
    name: 'configurationSchema',
    type: 'object',
    label: 'Schéma de configuration'
  }
];


const inptuFields = [
  {
    name: 'codeProject',
    label: 'Projet',
    type: 'select',
    optionSource: {
      url: '/v1/projects',
      dataPath: 'data',
      displayPath: 'code',
      valuePath: 'code',
      sortBy: 'code'
    }
  },
  {
    name: 'codeDeviceType',
    label: 'Dispositif type',
    type: 'select',
    optionSource: {
      url: '/v1/device-types',
      dataPath: 'data',
      displayPath: 'code',
      valuePath: 'code',
      sortBy: 'code'
    }
  },
  {
    name: 'iothubInstance',
    label: 'IoT Hub',
    type: 'text'
  },
  {
    name: 'metadataSchema',
    type: 'object',
    label: 'Schéma des métadonneés'
  },
];

const displayFields$3 = [
  {
    name: 'id',
    type: 'text',
    label: 'ID'
  },
  {
    name: 'codeProject',
    type: 'text',
    label: 'Projet'
  },
  {
    name: 'codeDeviceType',
    type: 'text',
    label: 'Dispositif type'
  },
  {
    name: 'iothubInstance',
    label: 'IoT Hub',
    type: 'text'
  },
  {
    name: 'hasMetadata',
    label: 'Metadata ?',
    type: 'boolean'
  },
];

const inputFields = [
  {
    name: 'code',
    label: 'Code',
    type: 'text'
  },
  ...putFields,
];

const subDTS = {
  name: 'Configurations',
  id: 'device-types/:code/device-type-settings',
  description: 'Configuration des dispositifs types par projet.',
  customLabels: {
    buttons: {
      addItem: '+ Configurer un disopsitif type pour un projet',
    },
  },
  methods: {
    getAll: {
      url: '/v1/device-types/:code/device-type-settings',
      dataPath: 'data',
      display: {
        type: 'table'
      },
      dataTransform: items => items.map((item) => Object.assign(item, {
        hasMetadata: item.metadataSchema && Object.keys(item.metadataSchema).length > 0,
      })),
      fields: displayFields$3,
      pagination,
    },
    getSingle: {
      url: '/v1/device-types/:code/device-type-settings/:id',
      id: 'device-types/:code/device-type-settings/:id',
      name: 'Détail d\'une configuration',
      fields: displayFields$3,
    },
    put: {
      url: '/v1/device-type-settings/:id',
      actualMethod: 'patch',
      includeOriginalFields: false,
      fields: [
        {
          name: 'metadataSchema',
          type: 'object',
          label: 'Schéma des métadonneés'
        },
      ]
    },
    post: {
      url: '/v1/device-types/:code/device-type-settings',
      fields: inptuFields,
    },
    delete: {
      url: '/v1/device-types/:code/device-type-settings/:id'
    }
  }
};

const deviceTypes = {
  name: 'Dispositifs types',
  id: 'device-types',
  description: 'Gestion des dispositifs types.',
  customLabels: {
    buttons: {
      addItem: '+ Nouveau dispositif type',
    },
  },
  subResources: [
    subDTS,
    {
      name: 'Profils',
      id: 'device-types/:code/profils',
      description: 'Profils de configurations.',
      methods: {
        getAll: {
          pagination,
          url: '/v1/device-types/:code/profils',
          dataPath: 'data',
          display: {
            type: 'table'
          },
          fields: [{
            name: 'name',
            label: 'Nom',
            type: 'text'
          }, {
            name: 'projectCode',
            label: 'Projet',
            type: 'text'
          }],
        },
      }
    }
  ],
  methods: {
    getAll: {
      url: '/v1/device-types',
      dataPath: 'data',
      dataTransform: items => items.map((item) => Object.assign(item, {
        hasConfigSchema: item.configurationSchema && Object.keys(item.configurationSchema).length > 0,
      })),
      display: {
        type: 'table'
      },
      fields: displayFields,
    },
    getSingle: {
      url: '/v1/device-types/:code',
      id: 'device-types/:code',
      name: 'Dispositif type :name en détails',
      fields: [
        {
          name: 'code',
          type: 'text',
          label: 'Code'
        }
      ],
      requestHeaders: {}
    },
    put: {
      url: '/v1/device-types/:code',
      actualMethod: 'patch',
      includeOriginalFields: false,
      fields: putFields,
    },
    post: {
      url: '/v1/device-types',
      fields: inputFields,
    },
    delete: {
      url: '/v1/device-types/:code'
    }
  }
};

const protocols = {
  name: 'Protocols',
  id: 'protocols',
  description: 'Protocols IoT supportés.',
  methods: {
    getAll: {
      url: '/v1/protocols',
      dataPath: 'data',
      display: {
        type: 'table'
      },
      fields: [
        {
          name: 'code',
          type: 'text',
          label: 'Code protocol'
        },
      ]
    },
  }
};

const putFields$1 = [
  {
    name: 'name',
    type: 'text',
    label: 'Nom'
  },
  {
    name: 'runtimeRef',
    type: 'text',
    label: 'Référence de la base Runtime'
  }
];
const postFields = [
  {
    name: 'code',
    label: 'Code projet',
    type: 'text'
  },
  ...putFields$1,
];
const displayFields$1 = postFields;
const projects = {
  name: 'Projets',
  id: 'projects',
  description: 'Gestion de référentiel des projets.',
  customLabels: {
    buttons: {
      addItem: '+ Nouveau projet',
    },
  },
  methods: {
    getAll: {
      url: '/v1/projects',
      dataPath: 'data',
      display: {
        type: 'table'
      },
      fields: displayFields$1,
    },
    getSingle: {
      url: '/v1/projects/:code',
      requestHeaders: {},
    },
    put: {
      url: '/v1/projects/:code',
      actualMethod: 'patch',
      includeOriginalFields: false,
      fields: putFields$1,
    },
    post: {
      url: '/v1/projects',
      fields: postFields,
    },
    delete: {
      url: '/v1/projects/:code'
    }
  },
};

const assetTypes = {
  name: 'Actifs types',
  id: 'asset-types',
  description: 'Gestion des actifs types.',
  customLabels: {
    buttons: {
      addItem: '+ Nouvel actif',
    },
  },
  customActions: [
    {
      url: '/v1/asset-type-settings',
      name: 'Associer à un projet',
      icon: 'wrench',
      actualMethod: 'post',
      fields: [
        {
          name: 'codeAssetType',
          label: 'Actif type',
          type: 'text',
          // originalName: 'code',
          readonly: true,
        },
        {
          name: 'codeProject',
          label: 'Projet',
          type: 'select',
          required: true,
          optionSource: {
            url: '/v1/projects',
            dataPath: 'data',
            displayPath: 'code',
            valuePath: 'code',
            sortBy: 'code'
          }
        },
      ],
    },
  ],
  methods: {
    getAll: {
      url: '/v1/asset-types',
      dataPath: 'data',
      display: {
        type: 'table'
      },
      fields: [
        {
          name: 'code',
          type: 'text',
          label: 'Code'
        },
        {
          name: 'name',
          type: 'text',
          label: 'Nom'
        },
      ]
    },
    getSingle: {
      url: '/v1/asset-types/:code',
      requestHeaders: {}
    },
    put: {
      url: '/v1/asset-types/:code',
      actualMethod: 'patch',
      includeOriginalFields: false,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom'
        },
      ]
    },
    post: {
      url: '/v1/asset-types',
      fields: [
        {
          name: 'code',
          type: 'text',
          label: 'Code'
        },
        {
          name: 'name',
          type: 'text',
          label: 'Nom'
        },
      ]
    },
    delete: {
      url: '/v1/asset-types/:code'
    }
  }
};

const putFields$2 = [
  {
    name: 'name',
    type: 'text',
    label: 'Nom'
  },
  {
    name: 'activated',
    type: 'boolean',
    label: 'Activée'
  }
];
const postFields$1 = [
  {
    name: 'code',
    type: 'text',
    label: 'Code de l\'application'
  },
  ...putFields$2,
];
const displayFields$2 = [
  ...postFields$1,
  {
    name: 'projects',
    type: 'text',
    label: 'Projet(s)'
  },
];
const clientApplications = {
  name: 'Applications clientes',
  id: 'client-applications',
  description: 'Gestion de référentiel des applications clientes.',
  customLabels: {
    buttons: {
      addItem: '+ Nouvel application',
    },
  },
  methods: {
    getAll: {
      url: '/v1/client-applications',
      dataPath: 'data',
      dataTransform: items => items.map((item) => Object.assign(item, {
        projects: item.projects ?
          JSON.stringify(item.projects.map((p) => p.code)).replace(/[\]\[']/g, '').replace(/,/g, ', ') :
          undefined,
      })),
      display: {
        type: 'table'
      },
      fields: displayFields$2
    },
    getSingle: {
      url: '/v1/client-applications/:code',
      requestHeaders: {}
    },
    put: {
      url: '/v1/client-applications/:code',
      actualMethod: 'patch',
      includeOriginalFields: false,
      fields: putFields$2,
    },
    post: {
      url: '/v1/client-applications',
      fields: postFields$1,
    },
    delete: {
      url: '/v1/client-applications/:code'
    }
  }
};

const deviceTypesSettings = {
  name: 'Configuration dispositifs types',
  id: 'device-type-settings',
  description: 'Configuration des dispositifs types par projet.',
  customLabels: {
    buttons: {
      addItem: '+ Configurer un disopsitif type pour un projet',
    },
  },
  methods: {
    getAll: {
      url: '/v1/device-type-settings',
      dataPath: 'data',
      display: {
        type: 'table'
      },
      dataTransform: items => items.map((item) => Object.assign(item, {
        hasMetadata: item.metadataSchema && Object.keys(item.metadataSchema).length > 0,
      })),
      fields: displayFields$3,
    },
    getSingle: {
      url: '/v1/device-type-settings/:id',
      requestHeaders: {}
    },
    put: {
      url: '/v1/device-type-settings/:id',
      actualMethod: 'patch',
      includeOriginalFields: false,
      fields: [
        {
          name: 'metadataSchema',
          type: 'object',
          label: 'Schéma des métadonneés'
        },
      ]
    },
    post: {
      url: '/v1/device-type-settings',
      fields: inptuFields,
    },
    delete: {
      url: '/v1/device-types/:code'
    }
  }
};

const groupTypes = {
  name: 'Groupes types',
  id: 'group-types',
  description: 'Gestion des groupes types.',
  customLabels: {
    buttons: {
      addItem: '+ Nouveau groupe',
    },
  },
  customActions: [
    {
      url: '/v1/project-group-type-link',
      name: 'Associer à un projet',
      icon: 'wrench',
      actualMethod: 'post',
      fields: [
        {
          name: 'codeGroupType',
          label: 'Groupe type',
          type: 'text',
          // originalName: 'code',
          readonly: true,
        },
        {
          name: 'codeProject',
          label: 'Projet',
          type: 'select',
          required: true,
          optionSource: {
            url: '/v1/projects',
            dataPath: 'data',
            displayPath: 'code',
            valuePath: 'code',
            sortBy: 'code'
          }
        },
      ],
    },
  ],
  methods: {
    getAll: {
      url: '/v1/group-types',
      dataPath: 'data',
      display: {
        type: 'table'
      },
      fields: [
        {
          name: 'code',
          type: 'text',
          label: 'Code'
        },
        {
          name: 'name',
          type: 'text',
          label: 'Nom'
        },
      ]
    },
    getSingle: {
      url: '/v1/group-types/:code',
      requestHeaders: {}
    },
    put: {
      url: '/v1/group-types/:code',
      actualMethod: 'patch',
      includeOriginalFields: false,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom'
        },
      ]
    },
    post: {
      url: '/v1/group-types',
      fields: [
        {
          name: 'code',
          type: 'text',
          label: 'Code'
        },
        {
          name: 'name',
          type: 'text',
          label: 'Nom'
        },
      ]
    },
    delete: {
      url: '/v1/group-types/:code'
    }
  }
};

const operators = {
  name: 'Opérateurs',
  id: 'operators',
  description: 'Opérateurs connectés à la plateforme.',
  methods: {
    getAll: {
      url: '/v1/operators',
      dataTransform: items => items.map((item) => Object.assign(item, {
        protocols: JSON.stringify(item.protocols.map((p) => p.code)).replace(/[\]\[']/g, '').replace(/,/g, ' / ')
      })),
      display: {
        type: 'table'
      },
      fields: [
        {
          name: 'code',
          type: 'text',
          label: 'Code opérateur'
        },
        {
          name: 'name',
          type: 'text',
          label: 'Nom'
        },
        {
          name: 'protocols',
          type: 'text',
          label: 'Protocols associés'
        }
      ]
    },
    getSingle: {
      url: '/v1/operators/:code',
      requestHeaders: {}
    }
  }
};

const subscriptions = {
  name: 'Inscriptions',
  id: 'client-application-subscriptions',
  description: 'Inscription des Applications clientes aux Projets.',
  customLabels: {
    buttons: {
      addItem: '+ Inscrire une application à un projet',
    },
  },
  methods: {
    getAll: {
      url: '/v1/client-application-subscriptions',
      dataPath: 'data',
      display: {
        type: 'table'
      },
      fields: [
        {
          name: 'id',
          type: 'text',
          label: 'ID'
        },
        {
          name: 'codeClientApplication',
          type: 'text',
          label: 'Code de l\'application cliente'
        },
        {
          name: 'codeProject',
          type: 'text',
          label: 'Code du projet'
        }
      ]
    },
    getSingle: {
      url: '/v1/client-application-subscriptions/:id',
      requestHeaders: {}
    },
    post: {
      url: '/v1/client-application-subscriptions',
      fields: [
        {
          name: 'codeClientApplication',
          label: 'Code de l\'application cliente',
          type: 'select',
          optionSource: {
            url: '/v1/client-applications',
            dataPath: 'data',
            displayPath: 'name',
            valuePath: 'code',
            sortBy: 'name',
          }
        },
        {
          name: 'codeProject',
          label: 'Code du projet',
          type: 'select',
          optionSource: {
            url: '/v1/projects',
            dataPath: 'data',
            displayPath: 'name',
            valuePath: 'code',
            sortBy: 'name',
          }
        }
      ]
    },
    delete: {
      url: '/v1/client-application-subscriptions/:id'
    }
  }
};

const resources = [
  projects,
  clientApplications,
  subscriptions,
  protocols,
  operators,
  deviceTypes,
  deviceTypesSettings,
  assetTypes,
  groupTypes,
];
resources.forEach(page => {
  if (page.methods.getAll) {
    page.methods.getAll.pagination = pagination;
  }
});
const config = {
  name: 'eSNCF IoT',
  baseUrl: 'http://localhost:3002',
  errorMessageDataPath: [
    'message.0.constraints.isNotEmpty',
    'message.0.constraints.matches',
    'message.0.constraints.isNotString',
    'message.0.constraints.whitelistValidation',
    'message.0',
  ],
  requestHeaders: {
    Authorization: 'Basic YWRtaW46MTIzNDU2Nzg5',
  },
  // unauthorizedRedirectUrl: '/#/login',
  resources,
  customLabels: {
    buttons: {
      addItem: '+ Ajouter élément',
      editItem: 'Modifier',
      deleteItem: 'Supprimer',
      closeForm: 'Fermer',
      clearInput: 'Vider',
    },
    formTitles: {
      addItem: 'Ajouter élément',
      editItem: 'Modifier élément',
    },
    placeholders: {
      text: 'Entrer texte...'
    },
    pagination: {
      itemsCount: ' ',
    }
  },
};

export default config;
