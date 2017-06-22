import { Component, OnInit, Input } from '@angular/core';
import { GithubIssuesService } from '../_services/github-issues.service';
import {GithubProjectService} from "../_services/github-project.service";

@Component({
  selector: 'app-issues-card',
  templateUrl: './issues-card.component.html',
  styleUrls: ['./issues-card.component.css']
})
export class IssuesCardComponent implements OnInit {
  @Input() projectName: string;
  @Input() idArray: number[];

  private loadingIssues: boolean;
  private rightButtonDisabled: boolean;
  private leftButtonDisabled: boolean;

  private issues;
  private currentIssue;
  private filteredIssues;
  private issueIndex: number;
  private issuesCount: number;

  private issueFilterName: string;
  private issueFilterValues: string[];

  private githubIssueColors: {[id: string]: string};

  private issueLabelColor: string;
  private issueTitle: string;
  private issueMessage: string;

  constructor(private githubIssuesService: GithubIssuesService,
              private githubProjectService: GithubProjectService) {
    // Initialize variables
    this.issues = [];
    this.filteredIssues = [];
    this.issuesCount = 0;
    this.issueIndex = 0;

    this.loadingIssues = true;
    this.leftButtonDisabled = true;
    this.rightButtonDisabled = true;

    this.issueLabelColor = 'white';
    this.issueTitle = 'Issue Title';
    this.issueMessage = 'Default Message';
    this.issueFilterName = 'All';

    // TODO: Move these to appropriate classes
    this.githubIssueColors = {
      'bug': 'red',
      'duplicate': 'grey',
      'enhancement': 'lightskyblue',
      'help wanted': 'green',
      'invalid': 'beige',
      'question': 'purple',
      'wontfix': 'white'
    };
    this.issueFilterValues = [
      'All',
      'Bug',
      'Duplicate',
      'Enhancement',
      'Help Wanted',
      'Invalid',
      'Question',
      'Won\'t Fix'
    ];
  }

  ngOnInit() {
    if (this.projectName === 'demo') {
      this.projectName = 'Sample';
      this.loadSampleData();
      return;
    }

    if (!this.projectName || !this.idArray || this.idArray === []) {
      console.log('Issue card requires both a project name and ID array');
      return;
    }

    // Retrieve all issues from github projects
    // TODO: As ID doesn't ensure uniqueness, adding the projectName will be necessary going forward
    // This assumes that IDs are unique which, in the sample data, they are
    this.githubProjectService.getGithubIssues(this.idArray).subscribe(
      data => {
        this.issues = data;

        this.filteredIssues = this.issues;

        this.loadingIssues = false;
        this.issueIndex = 0;
        this.issuesCount = this.issues.length;

        // Enable the right button if there's more than one commit
        if (this.issuesCount > 1) this.rightButtonDisabled = false;

        this.updateIssueInfo();
      },
      error => {
        console.error('Error fetching github commits: ' + error);
      }
    );
  }

  /**
   * Increment the commitIndex if possible, then update buttons and the displayed commit information
   */
  onRightClick() {
    if (this.issueIndex < this.issuesCount) {
      this.issueIndex++;

      // Update button capabilities
      if (this.issueIndex === this.issuesCount - 1) this.rightButtonDisabled = true;
      if (this.issueIndex > 0) this.leftButtonDisabled = false;

      this.updateIssueInfo();
    }
  }

  /**
   * Decrement the commitIndex if possible, then update buttons and the displayed commit information
   */
  onLeftClick() {
    if (this.issueIndex > 0) {
      this.issueIndex--;

      // Update button capabilities
      if (this.issueIndex < this.issuesCount) this.rightButtonDisabled = false;
      if (this.issueIndex === 0) this.leftButtonDisabled = true;

      this.updateIssueInfo();
    }
  }

  /**
   * Update the issue HTML display elements with the currently selected issue
   */
  updateIssueInfo() {
    this.currentIssue = this.filteredIssues[this.issueIndex];
    this.issueLabelColor = this.githubIssueColors[this.currentIssue.issueLabel];
    this.issueTitle = '#' + this.currentIssue.number + ' ' + this.currentIssue.title;
    this.issueMessage = this.currentIssue.body;
  }

  /**
   * Filter existing issues according to the supplied value
   *
   * @param filterVal The filter to apply
   */
  dropdownFilterSelect(filterVal: string) {
    // Disable buttons
    this.leftButtonDisabled = this.rightButtonDisabled = true;

    // Ensure that filerVal exists within the defined filter array
    if (this.issueFilterValues.indexOf(filterVal) > -1) {
      // Clear then repopulate filteredIssues
      this.filteredIssues = [];
      this.issueIndex = 0;
      this.issueFilterName = filterVal;

      // If all is supplied, set filteredIssues to all issues
      if (filterVal === 'All') {
        this.issueIndex = 0;
        this.filteredIssues = this.issues;
        this.issuesCount = this.filteredIssues.length;
        if (this.issuesCount > 1) this.rightButtonDisabled = false;
        this.updateIssueInfo();
      }
      else {
        // Iterate issues, compare their issueLabel with the supplied value, and build filteredIssues
        for (const issue of this.issues) {
          if (issue.issueLabel === filterVal.toLowerCase()) {
            this.filteredIssues.push(issue);
            console.log(this.filteredIssues);
          }
        }

        // If filtered issues were found, display them, otherwise display "none found"
        if (this.filteredIssues.length > 0) {
          this.issueIndex = 0;
          this.issuesCount = this.filteredIssues.length;

          // If there's more than one issue, enable the right button
          if (this.issuesCount > 1) this.rightButtonDisabled = false;

          this.updateIssueInfo();
        }
        else {
          this.issuesCount = 0;
          this.issueLabelColor = 'white';
          this.issueTitle = 'No Issues Found!';
          this.issueMessage = ' ';
        }
      }
    }
  }

  /**
   * Populate issue widget with sample data
   */
  loadSampleData() {
    // Clear then repopulate issues
    // TODO: getIssuesSlowly is temporary for testing, to be replaced with getIssues
    this.githubIssuesService.getIssuesSampleSlowly().subscribe(
      issues => {
        console.log('Github issues fetch success');

        // Default filteredIssues to all issues
        this.issues = issues;
        this.filteredIssues = this.issues;

        // Setup some vars TODO: Move this to appropriate spot
        this.loadingIssues = false;
        this.issueIndex = 0;
        this.issuesCount = this.issues.length;

        // Enable the right button if there's more than one commit
        if (this.issuesCount > 0) this.rightButtonDisabled = false;

        this.updateIssueInfo();
      },
      error => {
        console.error('Error fetching github commits: ' + error);
      });
  }
}
