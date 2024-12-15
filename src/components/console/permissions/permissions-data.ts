const randomBooleanValue = () => Math.random() < 0.5

export const createRoleFormDefaultValues = (
  _resources: Resource[],
  getDefaultValue: () => boolean = randomBooleanValue,
): PermissionsField[] => {
  return _resources.map((resource) => ({
    name: resource.name,
    description: resource.description,
    view: {
      value: getDefaultValue(),
      table: resource.table,
    },
    add: {value: getDefaultValue()},
    edit: {value: getDefaultValue()},
    delete: {value: getDefaultValue()},
  }))
}

export const createRoleModificationFormDefaultValues = (
  _resources: Resource[],
  getDefaultValue: () => boolean = randomBooleanValue,
): PermissionsField[] => {
  return _resources.map((resource) => ({
    name: resource.name,
    description: resource.description,
    view: {
      value: getDefaultValue(),
      table: resource.table,
    },
    add: {value: getDefaultValue()},
    edit: {value: getDefaultValue()},
    delete: {value: getDefaultValue()},
  }))
}

interface TableColumn {
  accessorId: string
  header: string
}

interface TableBlackListAccess {
  columns: TableColumn[]
}

interface TableBlacklist {
  read: TableBlackListAccess
  write: TableBlackListAccess
}
interface Table {
  blacklist: TableBlacklist
  columns: TableColumn[]
}

export interface Resource {
  name: string
  description: string
  table: Table
}

export const resources: Resource[] = [
  {
    name: 'Projects',
    description: 'Description for Projects',

    table: {
      columns: [
        {accessorId: 'id', header: 'ID'},
        {accessorId: 'name', header: 'Name'},
      ],
      blacklist: {
        read: {
          columns: [],
        },
        write: {
          columns: [],
        },
      },
    },
  },
  {
    name: 'Daily Reports',
    description: 'Description for Daily Reports',
    table: {
      columns: [
        {accessorId: 'id', header: 'ID'},
        {accessorId: 'name', header: 'Name'},
      ],
      blacklist: {
        read: {
          columns: [],
        },
        write: {
          columns: [],
        },
      },
    },
  },
  {
    name: 'Equipment damage Reports',
    description: 'Description for Equipment damage Reports',

    table: {
      columns: [
        {accessorId: 'id', header: 'ID'},
        {accessorId: 'name', header: 'Name'},
      ],
      blacklist: {
        read: {
          columns: [],
        },
        write: {
          columns: [],
        },
      },
    },
  },
  {
    name: 'Employee accident Reports',
    description: 'Description for Employee accident Reports',
    table: {
      columns: [
        {accessorId: 'id', header: 'ID'},
        {accessorId: 'name', header: 'Name'},
      ],
      blacklist: {
        read: {
          columns: [],
        },
        write: {
          columns: [],
        },
      },
    },
  },
  {
    name: 'Employees',
    description: 'Description for Employees',
    table: {
      columns: [
        {accessorId: 'id', header: 'ID'},
        {accessorId: 'name', header: 'Name'},
      ],
      blacklist: {
        read: {
          columns: [],
        },
        write: {
          columns: [],
        },
      },
    },
  },
  {
    name: 'Equipment',
    description: 'Description for Equipment',
    table: {
      columns: [
        {accessorId: 'id', header: 'ID'},
        {accessorId: 'name', header: 'Name'},
      ],
      blacklist: {
        read: {
          columns: [],
        },
        write: {
          columns: [],
        },
      },
    },
  },
  {
    name: 'Materials',
    description: 'Description for Materials',
    table: {
      columns: [
        {accessorId: 'id', header: 'ID'},
        {accessorId: 'name', header: 'Name'},
      ],
      blacklist: {
        read: {
          columns: [],
        },
        write: {
          columns: [],
        },
      },
    },
  },
  {
    name: 'Project Gallery',
    description: 'Description for Project Gallery',
    table: {
      columns: [
        {accessorId: 'id', header: 'ID'},
        {accessorId: 'name', header: 'Name'},
      ],
      blacklist: {
        read: {
          columns: [],
        },
        write: {
          columns: [],
        },
      },
    },
  },
  {
    name: 'Tasks',
    description: 'Description for Tasks',
    table: {
      columns: [
        {accessorId: 'id', header: 'ID'},
        {accessorId: 'name', header: 'Name'},
      ],
      blacklist: {
        read: {
          columns: [],
        },
        write: {
          columns: [],
        },
      },
    },
  },
  {
    name: 'Time Card',
    description: 'Description for Time Card',
    table: {
      columns: [
        {accessorId: 'id', header: 'ID'},
        {accessorId: 'name', header: 'Name'},
      ],
      blacklist: {
        read: {
          columns: [],
        },
        write: {
          columns: [],
        },
      },
    },
  },
]

interface Access {
  name: string
  label: string
}

export const accesses: Access[] = [
  {name: 'view', label: 'View'},
  {name: 'add', label: 'Add'},
  {name: 'edit', label: 'Edit'},
  {name: 'delete', label: 'Delete'},
]

interface PermissionsField {
  name: string
  description: string
  view: {value: boolean; table: Table}
  add: {value: boolean}
  edit: {value: boolean}
  delete: {value: boolean}
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: PermissionsField[]
}

export const roles: Role[] = [
  {
    id: 'User',
    name: 'User',
    description: 'Some random description for user role',
    permissions: createRoleFormDefaultValues(resources),
  },
  {
    id: 'Admin',
    name: 'Administrator',
    description: 'Some random description for administrator role',
    permissions: createRoleFormDefaultValues(resources),
  },
]
