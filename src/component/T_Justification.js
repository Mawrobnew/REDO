import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Request} from "../utils/WebRequestMiddleware";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import '../css/table.css';
import ToolkitProvider, { Search, CSVExport }  from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import M_CreateJustification from "./M_CreateJustification";

function T_Justification(){
    const [userList, setUserList] = useState([]);

    const columns = [
        {dataField: 'Folio', text: 'Folio', sort: true, filterFactory: textFilter(), key: 1},
        {dataField: 'Nombre', text: 'Nombre', sort: true, key: 2},
        {dataField: 'Status', text: 'Estado', sort: true, key: 3},
        {dataField: 'Telefono', text: 'Teléfono', sort: true, key: 4},
        {dataField: 'Fecha', text: 'Fecha', sort: true, key: 5},
        {dataField: 'CanJustif', text: 'Num. de justificación', sort: true, key: 6},
        {dataField: 'Razon', text: 'Razon', sort: true, key: 7}
    ]

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
            Registros { from } hasta { to } de { size } totales
        </span>
    );
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
        },
        paginationTotalRenderer: customTotal
    });

    useEffect(() => {
        const asyncFetch = async () => {
            const [json, code] = await Request('GET', '/justifications')
            if (json.length > 0) setUserList(json)
        }
        asyncFetch()
    }, [])

    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;

    return(
        <ToolkitProvider
            id='T9'
            bootstrap4
            keyField='Id'
            columns={columns}
            data={userList}
            search
        >
            {
                props => (
                    <div id='container'>
                        <div id='cont_tabla'>
                            <p className='titleT'>Justificaciones</p>
                            <hr></hr>
                            <SearchBar { ...props.searchProps } placeholder="Buscar" className={'searchBarTable'}/>

                            <BootstrapTable
                                { ...props.baseProps }
                                pagination={pagination}
                                filter={filterFactory()}
                                striped={true}
                                bordered={false}
                                condensed={true}
                                hover={true}
                                headerClasses='TableHead'
                                bodyClasses='TableBody'
                                wrapperClasses='pruebaWrapper'
                            >
                            </BootstrapTable>
                            <ExportCSVButton { ...props.csvProps} className={'btnDownload'}>Descargar</ExportCSVButton>
                            <M_CreateJustification/>
                        </div>
                    </div>
                )
            }
        </ToolkitProvider>
    )

}

export default T_Justification;