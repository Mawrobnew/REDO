import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Request} from "../utils/WebRequestMiddleware";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import M_ChangeStatus from './M_ChangeStatus';
import M_UploadDocuments from './M_UploadDocuments'
import '../css/table.css';
import ToolkitProvider, { Search, CSVExport }  from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

function T_CommunityHistoric(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    const btnModUStatus = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_ChangeStatus open={isOpen} onClose={setIsOpen}></M_ChangeStatus>
            </div>
        );
    };
    const btnUploadDoc = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <M_UploadDocuments open={isOpen} onClose={setIsOpen}></M_UploadDocuments>
            </div>
        );
    };

    const columns = [
        {dataField:'Fecha', text:'Fecha', sort:true, filterFactory:textFilter(), key:1},
        {dataField:'PaquetesEnviados', text:'Paquetes enviados', sort:true, key:2},
        {dataField:'Comunidad', text:'Comunidad', sort:true, key:3},
        {dataField:'MiembroComite', text:'Encargado', sort:true, key:4},
        {dataField:'Telefono', text:'Teléfono', sort:true, key:5}
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
            const [result, code] = await Request('GET', '/requests')
            if (result.length>0) setUserList(result)
        }
        asyncFetch()
    }, [])

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    return(
        <ToolkitProvider
            id='T7'
            bootstrap4
            keyField='Id'
            columns={columns}
            data={userList}
            search
        >
            {
                props => (
                    <div id='cont_tabla'>
                        <p className='title'>Histórico de peticiones</p>
                        <hr></hr>
                        <SearchBar { ...props.searchProps } />
                        <ClearSearchButton { ...props.searchProps }/>
                        <ExportCSVButton { ...props.csvProps }>Descargar</ExportCSVButton>
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
                    </div>
                )
            }
        </ToolkitProvider>
    )

}

export default T_CommunityHistoric;