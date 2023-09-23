import 'package:bin_tracker_flutter/auth.dart';
import 'package:bin_tracker_flutter/providers/UserProvider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bin Tracker',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xff3DA35D)),
        fontFamily: 'Poppins',
        useMaterial3: true,
      ),
      home: ChangeNotifierProvider(
        create: (_) => UserProvider(),
        child: const AuthPage(),
      ),
      routes: {
        '/auth': (context) => const AuthPage(),
      },
    );
  }
}
