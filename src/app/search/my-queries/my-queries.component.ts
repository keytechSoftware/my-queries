import { Component, OnInit } from '@angular/core';

import { HttpService } from "../../services/http.service";
import { AlertService } from "../../services/alert.service";
import { Server } from "../../shared/server";
import { Tools } from "../../shared/tools";
import { TreeNodeResponse } from "../../api/treenode-response";
import { SearchResponse } from "../../api/search-response";

@Component({
  selector: 'kt-my-queries',
  templateUrl: './my-queries.component.html'
})
export class MyQueriesComponent implements OnInit {

  constructor(
      private httpService: HttpService,
      private alertService: AlertService) { }

  queries;
  queryID;

  queryName;
  queryResult;
  showBreadCrumb: boolean = false;

  recordsFound: number;
  pageSize: number = 10;
  pageNumber: number = 1;
  maxPageNumber: number;

  currentUserFullName: string;

  ngOnInit() {
    this.currentUserFullName = Tools.getStorageValue('currentUserFullName');
    this.getQueries();

    // Refresh?
    const queryID = Tools.getStorageValue('lastMyQueryID');
    if (queryID)
      this.redoSearch(1);
  }


  /**
   * Execute the query with the given page number again
   * 
   * @param {number} pageNumber 
   * @memberof MyQueriesComponent
   */
  redoSearch(pageNumber: number) {
    this.pageNumber = pageNumber;
    const queryID = Tools.getStorageValue('lastMyQueryID');
    const queryName = Tools.getStorageValue('lastMyQueryName');
    this.runQuery(queryID, queryName);
  }


  /**
   * Download the master file of a keytech document
   * 
   * @param {any} elementInfo 
   * @memberof MyQueriesComponent
   */
  async onDownloadMasterFile(elementInfo: any) {
    var elementKey = elementInfo.value.Key;

    try {
      await this.httpService.downloadMasterFile(Server.WebApiUrl, elementKey).toPromise();
    } 
    catch (error) {
      console.log ("Error: onDownloadMasterFile {" + elementInfo + "}" + error)
    }
  }


  /**
   * Executes the query with the specified ID
   * 
   * @param {string} queryID 
   * @param {string} queryName 
   * @memberof MyQueriesComponent
   */
  async runQuery(queryID: string, queryName: string) {

    this.queryName = queryName;

    // Diffenrent query than the last?
    if (queryID != Tools.getStorageValue('lastMyQueryID'))
      this.pageNumber = 1;
    
    Tools.setStorageValue('lastMyQueryID', queryID);
    Tools.setStorageValue('lastMyQueryName', queryName);

    let url = Server.WebApiUrl + "/search?byQuery=" + queryID + "&page=" + this.pageNumber + "&size=" + this.pageSize;
    if (this.showBreadCrumb)
      url += "&linkinfos=true";

    try {
      const response: SearchResponse = await this.httpService.sendGetRequest(url).toPromise();

      this.queryResult = SearchResponse.ToArray(response);
      this.recordsFound = response.Totalrecords;
      this.pageSize = response.PageSize;

      response.PageNumber = response.PageNumber;
      Tools.setStorageValue('lastQueryPageNumber', response.PageNumber.toString());

      this.maxPageNumber = Math.ceil(this.recordsFound / this.pageSize);

      if (this.recordsFound==0)
        this.alertService.success("Keine Elemente gefunden :-(");
      else
        this.alertService.clearMessage();

      // Scroll to result
      const element = document.querySelector("#result");
      if (element) element.scrollIntoView(true);

    } 
    catch (error) {
      this.alertService.error(error);
    }      
  }


  /**
   * Determines the queries of the user
   * 
   * @memberof MyQueriesComponent
   */
  async getQueries() { 
    
    var username: string = Tools.getStorageValue('currentUser');

    this.alertService.info("Abfragen werden ermittelt...");

    try {
      const response: TreeNodeResponse = await this.httpService
      .sendGetRequest(Server.WebApiUrl + "/user/" + username + "/queries").toPromise();

      this.queries = TreeNodeResponse.ToArray(response);
      
      if (this.queries.length == 0)
        this.alertService.success("Keine Abfragen vorhanden");
      else
        this.alertService.clearMessage();

    } 
    catch (error) {
      this.alertService.error(error);
    }

  }

}
