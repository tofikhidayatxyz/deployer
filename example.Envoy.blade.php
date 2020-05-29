@servers(['dev' => '127.0.0.1'])

@setup
    $dir = '/var/www/deployer';
@endsetup

@story('deploy', ['on' => 'dev'])
    pull_changes
    build_assets
@endstory

@task('pull_changes')
    cd {{ $dir }}
    git reset --hard HEAD;git clean -df
    git pull origin master
@endtask

@task('build_assets')
    cd {{ $dir }}
    npm install
    npm run build
@endtask