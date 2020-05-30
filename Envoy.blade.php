@servers(['dev' => '127.0.0.1'])

@setup
    $dir = '/var/www/sqira';
@endsetup

@story('deploy', ['on' => 'dev'])
    pull_changes
    run_composer
    build_assets
@endstory

@task('pull_changes')
    cd {{ $dir }}
    git reset --hard HEAD;git clean -df
    git pull origin master
@endtask

@task('run_composer')
    cd {{ $dir }}
    echo "Starting deployment"
    composer install --prefer-dist --no-scripts -q -o
@endtask

@task('build_assets')
    cd {{ $dir }}
    echo "Build assets"
    npm install
    npm run prod
@endtask
