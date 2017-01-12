import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

//paths are relative to the execution path
export default {
  entry: 'app/main-aot.js',
  dest: 'aot/dist/build.js', // output a single application bundle
  sourceMap: true,
  sourceMapFile: 'aot/dist/build.js.map',
  format: 'iife',
  onwarn: function (warning) {
    // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
  },
  plugins: [
    nodeResolve({jsnext: true, module: true}),
    commonjs({
      include: [
        'node_modules/rxjs/**',
        'node_modules/ng2-bootstrap/**'
      ],
      namedExports: { 
        'node_modules/ng2-bootstrap/ng2-bootstrap.js': [
          'AccordionModule',
          'ModalDirective',
          'ModalModule',
          'TabsModule'
        ]
      },
    }),
    uglify()
  ]
}
