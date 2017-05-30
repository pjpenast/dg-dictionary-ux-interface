import React, { Component } from 'react'
import './App.css'

import { Field, Switch, Navigation, Breadcrumb } from './components'

var dataBases = [
  {
    name: 'Clients',
    type: 'cassandra',
    originalName: 'clients',
    description: null,
    tables: [
      {
        icon: 'table',
        originalName: 'personal_data',
        name: 'Personal Data',
        columns: [
          {
            originalName: '_id',
            type: 'type/MongoBSONID',
            name: 'ID',
            description: null
          },
          {
            originalName: 'name',
            type: 'type/text',
            name: 'Name',
            description: null
          },
          {
            name: 'Email',
            originalName: 'email',
            type: 'type/text',
            description: null
          }
        ]
      },
      {
        icon: 'table',
        name: 'Sales',
        columns: [
          {
            originalName: '_id',
            type: 'type/MongoBSONID',
            name: 'ID',
            description: null
          },
          {
            originalName: 'name',
            type: 'type/text',
            name: 'Name',
            description: null
          },
          {
            originalName: 'quantity',
            type: 'type/integer',
            name: 'Quantity',
            description: null
          }
        ]
      }
    ]
  },
  {
    name: 'Sales',
    type: 'mongoDB',
    description: null,
    tables: [
      {
        icon: 'table',
        name: 'Quality',
        columns: []
      },
      {
        icon: 'table',
        name: 'Prices',
        columns: []
      }
    ]
  },
  {
    originalName: 'transactions',
    name: 'Transactions',
    type: 'hdfs',
    description: null,
    tables: [
      {
        icon: 'folder',
        name: 'Size',
        columns: [],
        structure: [
          {
            icon: 'folder',
            name: 'Items',
            structure: [
              {
                icon: 'file',
                name: 'data.txt'
              },
              {
                icon: 'file',
                name: 'data.txt'
              }
            ]
          },
          {
            icon: 'folder',
            name: 'files'
          }
        ]
      },
      {
        icon: 'folder',
        name: 'Countries'
      },
      {
        icon: 'file',
        name: 'data.txt'
      },
      {
        icon: 'table',
        name: 'contability.csv'
      }
    ]
  }
]

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDatabase: dataBases[0],
      tableActive: false,
      dbActive: false,
      dataBases: dataBases,
      techTable: false,
      breadcrumb: []
    }
  }

  componentWillMount() {
    this.updateBreadCrumb(
      { name: this.state.currentDatabase.name, type: 'database' },
      'add'
    )
  }

  updateBreadCrumb(item, mode) {
    let breadcrumbArray = Object.assign([], this.state.breadcrumb)

    if (mode === 'add') {
      breadcrumbArray.push(item)

      this.setState({
        breadcrumb: breadcrumbArray
      })
    } else {
      breadcrumbArray = breadcrumbArray.filter(i => i.name !== item.name)

      this.setState({
        breadcrumb: breadcrumbArray
      })
    }
  }

  changeDatabase(event) {
    let name = event.target.value
    this.setState(
      {
        currentDatabase: this.state.dataBases.find(
          db => db.name === event.target.value
        ),
        currentTable: null,
        dbActive: true,
        tableActive: false,
        breadcrumb: []
      },
      () => {
        this.updateBreadCrumb({ name: name, type: 'database' }, 'add')
      }
    )
  }

  changeTable(table) {
    if (this.state.currentTable)
      this.updateBreadCrumb(
        { name: this.state.currentTable.name, type: 'table' },
        'remove'
      )

    this.setState(
      {
        tableActive: true,
        dbActive: false,
        currentTable: this.state.currentDatabase.tables.find(t => {
          return t.name === table
        })
      },
      () => {
        this.updateBreadCrumb({ name: table, type: 'table' }, 'add')
      }
    )
  }

  selectDatabase() {
    if (this.state.currentTable)
      this.updateBreadCrumb(
        { name: this.state.currentTable.name, type: 'table' },
        'remove'
      )

    this.setState({
      dbActive: !this.state.dbActive,
      currentTable: null,
      tableActive: false
    })
  }

  updateNameDb(name) {
    this.setState({
      dataBases: this.state.dataBases.map(db => {
        if (db.name === this.currentDatabase.name) {
          db.name = name
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="database">
          <p>Select DataBase: </p>
          <select name="database" onChange={this.changeDatabase.bind(this)}>
            {this.state.dataBases.map((db, i) => {
              return <option key={i} value={db.name}>{db.name}</option>
            })}
          </select>
        </div>

        <div className="layout">
          <div className="left">
            <div className="data">
              <p className="subtitle">DATASOURCE</p>
              <p className="db" onClick={this.selectDatabase.bind(this)}>
                <i className="fa fa-database" aria-hidden="true" />
                {this.state.currentDatabase.name}
              </p>
              <br />

              <Navigation
                type={this.state.currentDatabase.type}
                items={this.state.currentDatabase.tables}
                onChange={this.changeTable.bind(this)}
                onUpdate={value => {
                  this.updateBreadCrumb(
                    { name: value.name, type: 'folder' },
                    'add'
                  )
                }}
              />

            </div>
          </div>

          <div className="right">

            <Breadcrumb items={this.state.breadcrumb} />

            {this.state.dbActive
              ? <div className="db-model">

                  <div className="header">
                    <h3>Database</h3>

                    <div className="btn-action">
                      <Switch
                        onChange={value => this.setState({ techData: value })}
                      />
                    </div>
                  </div>

                  {this.state.techData
                    ? <div className="fields">
                        <Field
                          name="Database Tech Name"
                          value={this.state.currentDatabase.originalName}
                          readOnly={true}
                        />
                        <Field
                          name="Database Type"
                          value={this.state.currentDatabase.type}
                          readOnly={true}
                        />

                      </div>
                    : <div className="fields">
                        <Field
                          name="Database Name"
                          value={this.state.currentDatabase.name}
                          onChange={value => {
                            this.state.currentDatabase.name = value
                          }}
                        />
                        <Field
                          name="Database Description"
                          placeholder="Enter a description"
                        />
                      </div>}

                </div>
              : false}

            {this.state.tableActive
              ? <div className="db-model">

                  <div className="header">
                    <h3>Table</h3>

                    <div className="btn-action">
                      <Switch
                        onChange={value => this.setState({ techData: value })}
                      />
                    </div>
                  </div>

                  <Field
                    name="Table Name"
                    value={this.state.currentTable.name}
                    onChange={value => {
                      this.state.currentTable.name = value
                    }}
                  />
                  <Field
                    name="Table Description"
                    placeholder="Enter a description"
                    value={this.state.currentTable.description}
                    onChange={value => {
                      this.state.currentTable.description = value
                    }}
                  />

                  {this.state.currentTable.columns.length
                    ? <div className="columns">

                        <div className="header">
                          <h3>Columns</h3>

                          <div className="btn-action">
                            <Switch
                              onChange={value =>
                                this.setState({ techTable: value })}
                            />
                          </div>
                        </div>

                        {this.state.currentTable.columns.map((column, i) => (
                          <div className="column" key={i}>

                            {this.state.techTable
                              ? <div className="techData">
                                  <Field
                                    name="Column Tech Name"
                                    value={column.originalName}
                                    readOnly={true}
                                  />

                                  <Field
                                    name="Column Types"
                                    value={column.type}
                                    readOnly={true}
                                  />

                                </div>
                              : <div className="funcData">
                                  <Field
                                    name="Column Name"
                                    value={column.name}
                                    onChange={value => {
                                      column.name = value
                                    }}
                                  />
                                  <Field
                                    name="Column Description"
                                    value={column.description}
                                    placeholder="Enter a description"
                                    onChange={value => {
                                      column.description = value
                                    }}
                                  />
                                </div>}

                          </div>
                        ))}

                      </div>
                    : false}

                </div>
              : false}

          </div>
        </div>
      </div>
    )
  }
}

export default App
