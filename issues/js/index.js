/*
  Below code is written in ES2016
  ## Libraries used
    - JQuery
    - [axios](https://github.com/mzabriskie/axios) for AJAX
    - [moment](http://momentjs.com) for formating dates returned from GitHub api
    - [marked.js](https://github.com/chjj/marked) to parse markdown returned from GitHub api
    - [polyfill.io](https://polyfill.io/v2/docs/) for detecting es5 browsers and loading polyfills
 */
$(document).ready(function () {
  
  const colors = [
	"#832c7f",
	"#4E598C",
	"#3758EF",
	"#171A21",
	"#23CE6B",
	"#F26419",
	"#331E36",
	"#F24333",
	"#2F3061",
	"#061A40",
	"#942911"
	]
  
  let selectedLabel = 'all'
  
  let allIssues = []
  
  let allRepos = []
  
  const ORG_NAME = 'fcc-hyd'
  
  const BASE_URL = 'https://api.github.com'
  
  const REPOS_URL = `${BASE_URL}/orgs/${ORG_NAME}/repos`
  
  const clearIssues = () => {
    $('main').empty();
  }
  
  const renderIssues = (repos) => {
    const sectionUI = repos.map((repo) =>{
      
      const repoName = repo.repo_name;
      
      const repoColor = allRepos.find((repo) => repo.name === repoName).color;
      
      const issues = repo.issues;
      
      const issuesUI = issues
                        .filter(issue => {
                          if (selectedLabel === 'all') {
                            return true
                          }
                          return issue.labels.filter((label) => label.name === selectedLabel).length
                        })
                        .map(issue => {
                          const labelsUI = issue.labels.map((label) => {
                                              return `<li style="background:#${label.color}">
                                                      <i class="fa fa-tag" aria-hidden="true"></i>${label.name}</li>`;
                                            }).join('');
                         return ( `
                          <div class="issue">
                            <div class="title">
                              <h2><a href=${issue.html_url} target="_blank"><i class='fa fa-exclamation' aria-hidden="true"></i>${issue.title}</a></h2>
                              <h6>#${issue.number} opened ${moment(issue.created_at).fromNow()} by <strong>${issue.user.login}</strong> on <strong>${repoName}</strong> repoistory</h6>
                            </div>
                            <div class="body">
                             ${ marked(issue.body) || 'No Description...'}
                            </div>
                            <div class="labels">
                              <ul>
                               ${labelsUI}
                              </ul>
                            </div>
                            <div class="footer">
                              <a href=${issue.html_url} target="_blank">Open In GitHub</a>
                            </div>
                          </div>
                          `);
                        }).join('');
      if(!issuesUI) {
        return '';
      }
      return (`
         <section>
          <h2 style="background:${repoColor}" class="text-center">
            <i class="fa fa-github-alt" aria-hidden="true"></i> ${repoName}
          </h2>
          ${issuesUI || `<div class="issue">No Issues Found with <strong>${selectedLabel}</strong> label</div>`}
        </section>
      `)
    });

    $('.loader').hide();

    sectionUI.filter(section => section).forEach((section) => {
      $('main').append(section);
    });

  }

  const renderError = (error) => {
    const message = error.response && error.response.data && error.response.data.message;
    $('.loader').hide();
    clearIssues();
    $('main').append(`
      <div class="error">
        <h3>Oops, Sorry We Encountered Some Error!...</h3>
        <p>${message || ''}</p>
        <div>
          <pre><code>${JSON.stringify(error, null, 4)}</code></pre>
        </div>
      </div>
    `)
  }

  $('#filter-labels').on('change', (e) => {
		const newSelectedLabel = e.target.value;
		console.log(newSelectedLabel);
		if (newSelectedLabel === selectedLabel) {
			return
		}
		selectedLabel = newSelectedLabel;
		clearIssues();
		renderIssues(allIssues);
    $('html, body').animate({
        scrollTop: $("#top").offset().top - 100
    }, 500);
	});

  axios.get(REPOS_URL)
    .then(response => {
      allRepos = response.data.map((repo) => {
        return {
          name: repo.full_name.split('/').reverse()[0],
          color: colors[Math.round(Math.random() * 10)] 
        }
      })
      return response.data.map((repo) => {
        return axios.get(`${BASE_URL}/repos/${repo.full_name}/issues`)
      })
    })
    .then(repos => axios.all(repos))
    .then(responses => responses.map((response) => response.data))
    .then(repos => {
      return repos.map(issues => {
        return issues.filter(issue => !issue.pull_request);
      })
    })
    .then(repos => repos.filter(issues => issues.length))
    .then(repos => {
      return repos.map(issues => { 
       return {
         repo_name: issues[0].repository_url.split('/').reverse()[0],
         issues: issues
       }
      })
    })
    .then(repos => {
      allIssues = repos;
      renderIssues(repos);
    })
    .catch(error => {
      renderError(error);
    });

})
