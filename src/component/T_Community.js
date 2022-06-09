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
import T_Comitee from './T_Comittee';
import M_CreateCommunity from "./M_CreateCommunity";
import M_CreateCommittee from "./M_CreateCommittee";

function T_BeneficiaryDocuments(){
    const [userList, setUserList] = useState([]);


    const columns = [
        {dataField:'Comunidad', text:'Nombre', sort:true, filterFactory:textFilter(), key:1},
        {dataField:'Frecuencia', text:'Frecuencia', sort:true, key:2},
        {dataField:'Municipio', text:'Municipio', sort:true, key:3},
        {dataField:'Estado', text:'Estado', sort:true, key:4}
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
            const [result, code] = await Request('GET', '/community')
            if (result.length>0) setUserList(result)
        }
        asyncFetch()
    }, [])

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    return(
        <ToolkitProvider
            id='T12'
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
                            <p className='titleT'>Comunidades</p>
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
                            <M_CreateCommunity/>
                            <M_CreateCommittee/>
                        </div>
                        <T_Comitee/>
                    </div>
                )
            }
        </ToolkitProvider>
    )

}

export default T_BeneficiaryDocuments;