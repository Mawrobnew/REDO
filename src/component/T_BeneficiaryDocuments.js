import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DownloadFileRequest, Request} from "../utils/WebRequestMiddleware";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import M_ChangeStatus from './M_ChangeStatus';
import M_UploadDocuments from './M_UploadDocuments'
import '../css/table.css';
import ToolkitProvider, { Search, CSVExport }  from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

function T_BeneficiaryDocuments(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false)


    const selectOptions = {
        0: 'gmail',
        1: 'hotmail',
        2: 'outlook',
        4: 'Shanna@melissa.tv'
    };

    const btnModUStatus = (cell, row, rowIndex, formatExtraData) => {
        const data = {name: row.Nombre, id: row.Id, status: 0}
        return (
            <div>
                <M_ChangeStatus beneficiaryInfo={data}/>
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

    const downloadFile = (id) => {
        console.log("Download for ", id)
        DownloadFileRequest('GET', '/beneficiaryDoc/' + id)
    }

    const btnUploadDo = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <div onClick={() => {
                    downloadFile(row.Id)
                }}>Descargar
                </div>
                {/*Aqui es donde se pasa el parametro, Id, para recuperar el documento*/}
            </div>
        );
    };

    const columns = [
        {dataField:'Folio', text:'Folio', sort:true, filterFactory:textFilter(), key:1},
        {dataField:'Nombre', text:'Nombre', sort:true, key:2},
        {dataField:'Status', text:'Estado', sort:true, key:5},
        {dataField:'btn3', text:'Credencial', formatter: btnUploadDo, key:3},
        {dataField:'btn', text:'Cambiar estado', formatter: btnModUStatus, key:6},
        {dataField:'btn2', text:'Documentos', formatter: btnUploadDoc, key:7}
        /*Falta la columna del id oculto para recibir los documentos*/
        /*{dataField:'NO SE', text:'Id', hidden:true, key:9}*/
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
            const [result, code] = await Request('GET', '/actBeneficiaries')
            if (result.length>0) setUserList(result)
        }
        asyncFetch()
    }, [])

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

    return(
        <ToolkitProvider
            id='T3'
            bootstrap4
            keyField='Id'
            columns={columns}
            data={userList}
            search
        >
            {
                props => (
                    <div id='cont_tabla'>
                        <p className='titleT'>Documentos beneficiarios</p>
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
                    </div>
                )
            }
        </ToolkitProvider>
    )

}

export default T_BeneficiaryDocuments;