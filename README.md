# CAMP COFFEE NODE JS BACKEND

<h2>Steps to download and start contributing</h2>

1. Clone the project down to your local. From your terminal, run

   <pre><code> git clone git@github.com:jdavault/CampCoffeeBackend.git
   </code></pre>

2. Change your directory and run these two commands

   <pre><code> cd CampCoffeeReactNative
   		yarn install
      obtain the ./config.js and ENV variable needed from a team member
   </code></pre>

3. BEFORE MAKING any CHANGES, do the steps below. Get your main branch current (git pull), and then create a feature branch)
   <pre><code> git checkout main
   		git pull
   		git checkout -b feature-some-descriptive-name
   </code></pre>
   <ul>
   			<li>
   		   	You can skip he first command if you are already in the main branch
   			</li>
   			<li>
   		   	Give branch descriptive name (https://codingsight.com/git-branching-naming-convention-best-practices)
   		  	</li>
   		  	<li>
   		   	Note, -b creates the branch, but if the branch has already been created  you can leave that off
   			</li>
   		</ul>
4. Make a few changes and then do a commit <pre><code> git status git add . git status git commit -m “Some descriptive info about your changes” </code></pre>
   <ul>
   			<li>
   				Note, you can us add . or add each file separately
   		  	</li>
   		</ul>
5. Once you have a few commits and feel like you are ready to collaborate with the team lead and do a PR
   <pre><code> git push –set-upstream origin feature-some-descriptive-name
   </code></pre>
   <ul>
   	<li>
   		set upstream needed the first time .. you can also use -u instead 
     	</li>
   </ul>
6. After your pull requests has been approved and merged you can delete it locally and from github
    <pre><code>  git checkout main
     git pull 
     git branch -d feature-some-descriptive-name
     git push origin --delete feature-some-descriptive-name
     git branch
   </code></pre>
   <ul>
   	<li>
   Usually the PR approver will delete the remote branch after approving the PR
     	</li>
   </ul>

##

This project was bootstrapped with Expo init

## Available Scripts

In the project directory, you can run:

### `expo start`
