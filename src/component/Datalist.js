import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Request} from "../utils/WebRequestMiddleware";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import M_ModUser from "./M_ModUser";
import M_DeleteUser from "./M_DeleteUser";


function DataList(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)


    const selectOptions = {
        0: 'gmail',
        1: 'hotmail',
        2: 'outlook',
        4: 'Shanna@melissa.tv'
    };

    const btnModUSer = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_ModUser open={isOpen} onClose={setIsOpen}></M_ModUser>
            </div>
        );
    };
    const btnDeleteUSer = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_DeleteUser open={isOpen} onClose={setIsOpen}></M_DeleteUser>
            </div>
        );
    };

    const columns = [
        {dataField:'Id', text:'Id', sort:true, filterFactory:textFilter()},
        {dataField:'Nombre', text:'Nombre', sort:true},
        {dataField:'Correo', text:'Correo', sort:true},
        {dataField:'Numero', text:'Telefono', sort:true},
        {dataField:'Rol', text:'Rol', sort:true},
        {dataField:'Sucursal', text:'Sucursal'},
        {dataField:'btn', text:'Modificar', formatter: btnModUSer},
        {dataField:'btn2', text:'Eliminar', formatter: btnDeleteUSer}
    ]
    
    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function(page, sizePerPage){
            console.log('page', page);
            console.log('sizePerPage', sizePerPage)
        },
        onSizePerPageChange: function(page, sizePerPage){
            console.log('page', page);
            console.log('sizePerPage', sizePerPage)
        }
    });

    useEffect(() => {
        const asyncFetch = async () => {
            const result = await Request('GET', '/user')
            const {done, payload} = result
            if (done) setUserList(payload)
        }
        asyncFetch()
    }, [])

    const selectRow = {
        mode:"checkbox"
    };

    return(

        <BootstrapTable 
        id='prueba2'
        bootstrap4 
        keyField='id' 
        columns={columns} 
        data={userList}
        pagination ={pagination}
        filter={filterFactory()}
        striped={true}
        bordered={ false }
        condensed={true}
        hover={true}
        headerClasses='pruebaHead'
        bodyClasses='pruebaBody'
        wrapperClasses='pruebaWrapper'
        >
        </BootstrapTable>
    )
}
/*
<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  search
>
  {
    props => (
      <div>
        <h3>Input something at below input field:</h3>
        <SearchBar { ...props.searchProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
        />
      </div>
    )
  }
</ToolkitProvider>
*/

export default DataList;