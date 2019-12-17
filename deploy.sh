### 
# @Description: 发布dist到团队github
 # @Author: Allen Tan
 # @Date: 2019-12-17 10:49:44
 # @LastEditors: Allen Tan
 # @LastEditTime: 2019-12-17 10:58:36
 ###

git checkout -b draft
npm run build
git add -f dist
git commit -am "Add deploy file"
git subtree split --prefix dist -b deploy
git push --force upstream deploy:deploy
git checkout master
git branch -D deploy
git branch -D draft